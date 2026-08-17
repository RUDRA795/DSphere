import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { soundManager } from '../utils/audio'

function latLngToVector3(lat, lng, radius = 1.35) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)
  return new THREE.Vector3(x, y, z)
}

const HUBS = [
  { name: 'TGPCET Nagpur', lat: 21.0345, lng: 79.0270, isHub: true, color: '#00FF9D' },
  { name: 'Tokyo Node', lat: 35.6762, lng: 139.6503, color: '#00F0FF' },
  { name: 'Silicon Valley', lat: 37.3861, lng: -122.0839, color: '#00F0FF' },
  { name: 'London Node', lat: 51.5074, lng: -0.1278, color: '#00F0FF' },
  { name: 'Frankfurt Node', lat: 50.1109, lng: 8.6821, color: '#8B5CF6' },
  { name: 'Singapore Node', lat: 1.3521, lng: 103.8198, color: '#00F0FF' },
  { name: 'Sydney Node', lat: -33.8688, lng: 151.2093, color: '#8B5CF6' },
  { name: 'Dubai Node', lat: 25.2048, lng: 55.2708, color: '#00F0FF' },
]

export default function Globe({ small = false }) {
  const containerRef = useRef(null)
  const [activeNode, setActiveNode] = useState('TGPCET Nagpur (Host Node)')
  const [isInteracting, setIsInteracting] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth || 450
    const height = container.clientHeight || 450

    // Scene & Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.set(0, 0.4, 3.8)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const globeGroup = new THREE.Group()
    scene.add(globeGroup)

    const radius = 1.3

    // Base Sphere
    const baseGeo = new THREE.SphereGeometry(radius, 48, 48)
    const baseMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#030B17'),
    })
    const baseMesh = new THREE.Mesh(baseGeo, baseMat)
    globeGroup.add(baseMesh)

    // Wireframe Grid
    const wireGeo = new THREE.SphereGeometry(radius + 0.005, 24, 18)
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#00F0FF'),
      wireframe: true,
      transparent: true,
      opacity: 0.09,
    })
    const wireMesh = new THREE.Mesh(wireGeo, wireMat)
    globeGroup.add(wireMesh)

    // Particle Cloud on surface
    const pointsCount = 1900
    const posArray = new Float32Array(pointsCount * 3)
    const colorArray = new Float32Array(pointsCount * 3)
    const cyan = new THREE.Color('#00F0FF')
    const violet = new THREE.Color('#8B5CF6')

    for (let i = 0; i < pointsCount; i++) {
      const u = Math.random()
      const v = Math.random()
      const theta = 2 * Math.PI * u
      const phi = Math.acos(2 * v - 1)
      const r = radius + 0.012

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)

      posArray[i * 3] = x
      posArray[i * 3 + 1] = y
      posArray[i * 3 + 2] = z

      const col = Math.random() > 0.45 ? cyan : violet
      colorArray[i * 3] = col.r
      colorArray[i * 3 + 1] = col.g
      colorArray[i * 3 + 2] = col.b
    }

    const pointsGeo = new THREE.BufferGeometry()
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    pointsGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3))
    const pointsMat = new THREE.PointsMaterial({
      size: 0.024,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    })
    const pointsCloud = new THREE.Points(pointsGeo, pointsMat)
    globeGroup.add(pointsCloud)

    // Atmosphere Glow
    const haloGeo = new THREE.SphereGeometry(radius * 1.14, 28, 28)
    const haloMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          gl_FragColor = vec4(0.0, 0.94, 1.0, 1.0) * intensity * 0.6;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    })
    const haloMesh = new THREE.Mesh(haloGeo, haloMat)
    scene.add(haloMesh)

    // Nagpur Center Marker
    const nagpurPos = latLngToVector3(21.0345, 79.0270, radius + 0.02)
    const nagpurMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 16, 16),
      new THREE.MeshBasicMaterial({ color: new THREE.Color('#00FF9D') })
    )
    nagpurMesh.position.copy(nagpurPos)
    globeGroup.add(nagpurMesh)

    // Ping Ring for Nagpur
    const pingRingGeo = new THREE.RingGeometry(0.045, 0.065, 24)
    const pingRingMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#00FF9D'),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    })
    const pingRing = new THREE.Mesh(pingRingGeo, pingRingMat)
    pingRing.position.copy(nagpurPos)
    pingRing.lookAt(nagpurPos.clone().multiplyScalar(2))
    globeGroup.add(pingRing)

    // Global Hub Markers & Arcs
    const arcsGroup = new THREE.Group()
    globeGroup.add(arcsGroup)

    const curves = []
    HUBS.forEach((hub) => {
      if (hub.isHub) return
      const pos = latLngToVector3(hub.lat, hub.lng, radius + 0.02)
      const pin = new THREE.Mesh(
        new THREE.SphereGeometry(0.022, 12, 12),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(hub.color) })
      )
      pin.position.copy(pos)
      globeGroup.add(pin)

      // Curve to Nagpur
      const mid = pos.clone().add(nagpurPos).multiplyScalar(0.5)
      const dist = pos.distanceTo(nagpurPos)
      mid.normalize().multiplyScalar(radius + dist * 0.4)
      const curve = new THREE.QuadraticBezierCurve3(pos, mid, nagpurPos)
      curves.push(curve)

      const lineGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(30))
      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color('#8B5CF6'),
        transparent: true,
        opacity: 0.35,
      })
      arcsGroup.add(new THREE.Line(lineGeo, lineMat))
    })

    // Arcs packet particles
    const packetCount = curves.length * 2
    const packetGeo = new THREE.BufferGeometry()
    const packetArr = new Float32Array(packetCount * 3)
    packetGeo.setAttribute('position', new THREE.BufferAttribute(packetArr, 3))
    const packetPoints = new THREE.Points(
      packetGeo,
      new THREE.PointsMaterial({ size: 0.035, color: new THREE.Color('#00FF9D'), transparent: true, opacity: 0.85 })
    )
    arcsGroup.add(packetPoints)

    const packetProgress = Array.from({ length: packetCount }, (_, i) => i / packetCount)

    // Initial Rotation
    globeGroup.rotation.y = -((79.0270 + 180) * (Math.PI / 180)) + Math.PI / 2 + 0.2
    globeGroup.rotation.x = 0.2

    // Interactive Drag Orbit
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0
    let autoRotate = true

    const onMouseDown = (e) => {
      isDragging = true
      autoRotate = false
      setIsInteracting(true)
      prevMouseX = e.clientX
      prevMouseY = e.clientY
      soundManager.playHoverBlip()
    }

    const onMouseMove = (e) => {
      if (!isDragging) return
      const deltaX = e.clientX - prevMouseX
      const deltaY = e.clientY - prevMouseY
      globeGroup.rotation.y += deltaX * 0.006
      globeGroup.rotation.x = Math.max(-0.6, Math.min(0.6, globeGroup.rotation.x + deltaY * 0.006))
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const onMouseUp = () => {
      isDragging = false
      setIsInteracting(false)
      setTimeout(() => {
        autoRotate = true
      }, 4000)
    }

    const domEl = renderer.domElement
    domEl.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    // Touch support for mobile
    let touchX = 0, touchY = 0
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        autoRotate = false
        touchX = e.touches[0].clientX
        touchY = e.touches[0].clientY
      }
    }
    const onTouchMove = (e) => {
      if (e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - touchX
        const deltaY = e.touches[0].clientY - touchY
        globeGroup.rotation.y += deltaX * 0.008
        touchX = e.touches[0].clientX
        touchY = e.touches[0].clientY
      }
    }
    const onTouchEnd = () => {
      setTimeout(() => { autoRotate = true }, 3000)
    }
    domEl.addEventListener('touchstart', onTouchStart, { passive: true })
    domEl.addEventListener('touchmove', onTouchMove, { passive: true })
    domEl.addEventListener('touchend', onTouchEnd)

    let animationFrame
    let clock = new THREE.Clock()
    let pingScale = 1

    const animate = () => {
      animationFrame = requestAnimationFrame(animate)
      const delta = clock.getDelta()

      if (autoRotate) {
        globeGroup.rotation.y += delta * 0.09
      }

      // Ping scale
      pingScale += delta * 1.6
      if (pingScale > 2.2) pingScale = 1
      pingRing.scale.set(pingScale, pingScale, pingScale)
      pingRingMat.opacity = Math.max(0, 1 - (pingScale - 1) / 1.2)

      // Move packets
      const positions = packetPoints.geometry.attributes.position.array
      for (let i = 0; i < packetCount; i++) {
        packetProgress[i] = (packetProgress[i] + delta * 0.4) % 1
        const curveIdx = i % curves.length
        const pt = curves[curveIdx].getPoint(packetProgress[i])
        positions[i * 3] = pt.x
        positions[i * 3 + 1] = pt.y
        positions[i * 3 + 2] = pt.z
      }
      packetPoints.geometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      if (!container) return
      const newW = container.clientWidth
      const newH = container.clientHeight
      camera.aspect = newW / newH
      camera.updateProjectionMatrix()
      renderer.setSize(newW, newH)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      domEl.removeEventListener('mousedown', onMouseDown)
      domEl.removeEventListener('touchstart', onTouchStart)
      domEl.removeEventListener('touchmove', onTouchMove)
      domEl.removeEventListener('touchend', onTouchEnd)
      cancelAnimationFrame(animationFrame)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      {/* 3D Canvas wrapper */}
      <div
        ref={containerRef}
        className={`w-full ${small ? 'h-[280px]' : 'h-[380px] sm:h-[480px]'} cursor-grab active:cursor-grabbing relative z-0`}
      />

      {/* Floating Telemetry Tag */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 glass-panel px-3 py-1.5 rounded-full border border-[#00F0FF]/30 text-xs font-mono flex items-center gap-2 whitespace-nowrap shadow-neon-cyan">
        <span className="w-2 h-2 rounded-full bg-[#00FF9D] animate-ping" />
        <span className="text-slate-300">NODE:</span>
        <span className="text-[#00F0FF] font-bold">TGPCET NAGPUR</span>
        <span className="text-slate-500">|</span>
        <span className="text-slate-400 text-[10px]">21.0345°N, 79.0270°E</span>
      </div>

      {/* Hint */}
      <div className="absolute top-2 right-2 text-[10px] font-mono text-slate-500 glass-panel px-2 py-1 rounded">
        {isInteracting ? 'MANUAL ROTATION ACTIVE' : 'DRAG TO ROTATE 3D SPHERE'}
      </div>
    </div>
  )
}
