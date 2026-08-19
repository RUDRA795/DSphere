import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Section3DBackground() {
  const mountRef = useRef(null)
  const location = useLocation()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const getActiveMode = (pathname) => {
    if (pathname.startsWith('/events/dataforge')) return 'dataforge'
    if (pathname.startsWith('/events/dataduals')) return 'dataduals'
    if (pathname.startsWith('/events/datamodelling')) return 'datamodelling'
    if (pathname.startsWith('/events')) return 'gallery'
    if (pathname.startsWith('/schedule')) return 'schedule'
    if (pathname.startsWith('/rules')) return 'rules'
    if (pathname.startsWith('/about')) return 'about'
    return 'home'
  }

  const activeMode = getActiveMode(location.pathname)

  useEffect(() => {
    const mountEl = mountRef.current
    if (!mountEl) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 24

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mountEl.appendChild(renderer.domElement)

    // 2. Dual-Theme Lighting System
    const ambientLight = new THREE.AmbientLight(isDark ? 0x0B1736 : 0xF1F5F9, isDark ? 1.0 : 1.5)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(isDark ? 0x00C2FF : 0x0284C7, isDark ? 1.8 : 2.4)
    keyLight.position.set(20, 25, 20)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(isDark ? 0x8B5CF6 : 0xF43F5E, isDark ? 1.4 : 1.8)
    fillLight.position.set(-20, -15, -15)
    scene.add(fillLight)

    const pointLight = new THREE.PointLight(isDark ? 0x00FF9D : 0x10B981, isDark ? 1.5 : 2.0, 45)
    pointLight.position.set(0, 0, 12)
    scene.add(pointLight)

    // Master container for all section environments
    const environments = {
      home: new THREE.Group(),
      dataforge: new THREE.Group(),
      dataduals: new THREE.Group(),
      datamodelling: new THREE.Group(),
      gallery: new THREE.Group(),
      schedule: new THREE.Group(),
      rules: new THREE.Group(),
      about: new THREE.Group(),
    }

    Object.values(environments).forEach((group) => {
      group.visible = false
      scene.add(group)
    })

    // Colors according to theme
    const cyanColor = isDark ? 0x00C2FF : 0x0284C7
    const violetColor = isDark ? 0x8B5CF6 : 0x7C3AED
    const emeraldColor = isDark ? 0x00FF9D : 0x059669
    const coralColor = isDark ? 0xFB7185 : 0xF43F5E
    const coreSolidColor = isDark ? 0x071124 : 0xE0F2FE

    // ══════════════════════════════════════════════════════════════════════
    // 1. HOME: INTERACTIVE DATA CORE
    // ══════════════════════════════════════════════════════════════════════
    const homeGroup = environments.home

    // Inner faceted solid crystal core
    const innerCoreGeo = new THREE.IcosahedronGeometry(3.6, 1)
    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: coreSolidColor,
      metalness: isDark ? 0.7 : 0.4,
      roughness: isDark ? 0.2 : 0.12,
      transparent: true,
      opacity: isDark ? 0.45 : 0.65,
    })
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat)
    homeGroup.add(innerCore)

    // Outer wireframe cage
    const outerCageGeo = new THREE.IcosahedronGeometry(5.2, isMobile ? 1 : 2)
    const outerCageMat = new THREE.MeshBasicMaterial({
      color: cyanColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.65,
    })
    const outerCage = new THREE.Mesh(outerCageGeo, outerCageMat)
    homeGroup.add(outerCage)

    // Gimbal Ring 1
    const gimbalGeo1 = new THREE.TorusGeometry(7.2, isDark ? 0.04 : 0.06, 16, 64)
    const gimbalMat1 = new THREE.MeshBasicMaterial({
      color: violetColor,
      transparent: true,
      opacity: isDark ? 0.45 : 0.70,
    })
    const gimbal1 = new THREE.Mesh(gimbalGeo1, gimbalMat1)
    gimbal1.rotation.x = Math.PI / 3
    homeGroup.add(gimbal1)

    // Gimbal Ring 2
    const gimbalGeo2 = new THREE.TorusGeometry(8.6, isDark ? 0.03 : 0.05, 16, 64)
    const gimbalMat2 = new THREE.MeshBasicMaterial({
      color: isDark ? emeraldColor : coralColor,
      transparent: true,
      opacity: isDark ? 0.4 : 0.65,
    })
    const gimbal2 = new THREE.Mesh(gimbalGeo2, gimbalMat2)
    gimbal2.rotation.y = Math.PI / 3.5
    homeGroup.add(gimbal2)

    // Floating orbital dust around Data Core
    const dustCount = isMobile ? 30 : 60
    const dustGeo = new THREE.BufferGeometry()
    const dustPositions = new Float32Array(dustCount * 3)
    for (let i = 0; i < dustCount * 3; i += 3) {
      const radius = 6 + Math.random() * 4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      dustPositions[i] = radius * Math.sin(phi) * Math.cos(theta)
      dustPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
      dustPositions[i + 2] = radius * Math.cos(phi)
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3))
    const dustMat = new THREE.PointsMaterial({
      color: cyanColor,
      size: isMobile ? 0.18 : 0.25,
      transparent: true,
      opacity: isDark ? 0.7 : 0.85,
    })
    const dustPoints = new THREE.Points(dustGeo, dustMat)
    homeGroup.add(dustPoints)

    // ══════════════════════════════════════════════════════════════════════
    // 2. DATAFORGE: NEURAL COMPUTATION CLUSTER & DATA PACKETS
    // ══════════════════════════════════════════════════════════════════════
    const forgeGroup = environments.dataforge
    const nodeCount = isMobile ? 20 : 36
    const nodePositions = []
    const forgeNodeGeo = new THREE.SphereGeometry(0.24, 12, 12)
    const forgeNodeMat = new THREE.MeshStandardMaterial({
      color: cyanColor,
      emissive: cyanColor,
      emissiveIntensity: isDark ? 0.6 : 0.5,
      metalness: 0.5,
      roughness: 0.2,
    })

    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 16
      const y = (Math.random() - 0.5) * 12
      const z = (Math.random() - 0.5) * 10
      nodePositions.push(new THREE.Vector3(x, y, z))
      const nodeMesh = new THREE.Mesh(forgeNodeGeo, forgeNodeMat)
      nodeMesh.position.set(x, y, z)
      forgeGroup.add(nodeMesh)
    }

    // Connect nodes
    const lineMat = new THREE.LineBasicMaterial({
      color: cyanColor,
      transparent: true,
      opacity: isDark ? 0.22 : 0.45,
    })
    const pathways = []
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 6.0) {
          const lineGeo = new THREE.BufferGeometry().setFromPoints([nodePositions[i], nodePositions[j]])
          const line = new THREE.Line(lineGeo, lineMat)
          forgeGroup.add(line)
          pathways.push({ start: nodePositions[i], end: nodePositions[j] })
        }
      }
    }

    // Moving Data Packets
    const packetCount = isMobile ? 6 : 14
    const packets = []
    const packetGeo = new THREE.SphereGeometry(0.16, 8, 8)
    const packetMat = new THREE.MeshBasicMaterial({
      color: isDark ? emeraldColor : coralColor,
      transparent: true,
      opacity: 0.95,
    })
    for (let i = 0; i < packetCount && pathways.length > 0; i++) {
      const pMesh = new THREE.Mesh(packetGeo, packetMat)
      forgeGroup.add(pMesh)
      packets.push({
        mesh: pMesh,
        pathway: pathways[i % pathways.length],
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.008,
      })
    }

    // ══════════════════════════════════════════════════════════════════════
    // 3. DATADUALS: OPPOSING TWIN ENERGY STRUCTURES
    // ══════════════════════════════════════════════════════════════════════
    const dualsGroup = environments.dataduals
    const dualRingGeo = new THREE.TorusGeometry(4.8, isDark ? 0.08 : 0.12, 16, 64)
    const leftRingMat = new THREE.MeshBasicMaterial({
      color: violetColor,
      transparent: true,
      opacity: isDark ? 0.5 : 0.75,
    })
    const rightRingMat = new THREE.MeshBasicMaterial({
      color: cyanColor,
      transparent: true,
      opacity: isDark ? 0.5 : 0.75,
    })
    const leftRing = new THREE.Mesh(dualRingGeo, leftRingMat)
    leftRing.position.x = -4.5
    leftRing.rotation.y = Math.PI / 5
    dualsGroup.add(leftRing)

    const rightRing = new THREE.Mesh(dualRingGeo, rightRingMat)
    rightRing.position.x = 4.5
    rightRing.rotation.y = -Math.PI / 5
    dualsGroup.add(rightRing)

    // Inner plasma spheres inside dual rings
    const plasmaGeo = new THREE.SphereGeometry(1.8, 16, 16)
    const leftPlasmaMat = new THREE.MeshStandardMaterial({
      color: violetColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.3 : 0.55,
    })
    const leftPlasma = new THREE.Mesh(plasmaGeo, leftPlasmaMat)
    leftRing.add(leftPlasma)

    const rightPlasmaMat = new THREE.MeshStandardMaterial({
      color: cyanColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.3 : 0.55,
    })
    const rightPlasma = new THREE.Mesh(plasmaGeo, rightPlasmaMat)
    rightRing.add(rightPlasma)

    // ══════════════════════════════════════════════════════════════════════
    // 4. DATAMODELLING: PARAMETRIC CAD ENGINEERING CUBE & MEASUREMENT RINGS
    // ══════════════════════════════════════════════════════════════════════
    const cadGroup = environments.datamodelling
    const cadCubeGeo = new THREE.BoxGeometry(6.5, 6.5, 6.5, 3, 3, 3)
    const cadCubeMat = new THREE.MeshBasicMaterial({
      color: emeraldColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.70,
    })
    const cadCube = new THREE.Mesh(cadCubeGeo, cadCubeMat)
    cadGroup.add(cadCube)

    // Inner solid translucent block
    const innerCadGeo = new THREE.BoxGeometry(4.0, 4.0, 4.0)
    const innerCadMat = new THREE.MeshStandardMaterial({
      color: coreSolidColor,
      metalness: 0.6,
      roughness: 0.2,
      transparent: true,
      opacity: isDark ? 0.35 : 0.60,
    })
    const innerCad = new THREE.Mesh(innerCadGeo, innerCadMat)
    cadGroup.add(innerCad)

    // Measurement orbit ring
    const cadRingGeo = new THREE.TorusGeometry(6.2, isDark ? 0.03 : 0.05, 16, 72)
    const cadRing = new THREE.Mesh(cadRingGeo, cadCubeMat)
    cadRing.rotation.x = Math.PI / 2
    cadGroup.add(cadRing)

    // ══════════════════════════════════════════════════════════════════════
    // 5. GALLERY: FLOATING TECHNICAL SATELLITE NODES
    // ══════════════════════════════════════════════════════════════════════
    const galleryGroup = environments.gallery
    const galleryRingGeo = new THREE.TorusGeometry(8.5, isDark ? 0.05 : 0.08, 16, 72)
    const galleryRingMat = new THREE.MeshBasicMaterial({
      color: cyanColor,
      transparent: true,
      opacity: isDark ? 0.3 : 0.65,
    })
    const galleryRing = new THREE.Mesh(galleryRingGeo, galleryRingMat)
    galleryRing.rotation.x = Math.PI / 3.5
    galleryGroup.add(galleryRing)

    // ══════════════════════════════════════════════════════════════════════
    // 6. SCHEDULE: ORBITAL TIMELINE RING SYSTEM & MILESTONES
    // ══════════════════════════════════════════════════════════════════════
    const schedGroup = environments.schedule
    const schedRingGeo = new THREE.TorusGeometry(9.0, isDark ? 0.06 : 0.09, 16, 80)
    const schedRingMat = new THREE.MeshBasicMaterial({
      color: cyanColor,
      transparent: true,
      opacity: isDark ? 0.35 : 0.70,
    })
    const schedRing = new THREE.Mesh(schedRingGeo, schedRingMat)
    schedRing.rotation.x = Math.PI / 4
    schedGroup.add(schedRing)

    // Milestones with pulsating beacons
    const milestoneMeshes = []
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const bx = Math.cos(angle) * 9.0
      const by = Math.sin(angle) * 9.0 * Math.cos(Math.PI / 4)
      const bz = -Math.sin(angle) * 9.0 * Math.sin(Math.PI / 4)
      const bGeo = new THREE.SphereGeometry(0.28, 12, 12)
      const bMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? emeraldColor : coralColor,
        emissive: i % 2 === 0 ? emeraldColor : coralColor,
        emissiveIntensity: isDark ? 0.8 : 0.6,
      })
      const bMesh = new THREE.Mesh(bGeo, bMat)
      bMesh.position.set(bx, by, bz)
      schedGroup.add(bMesh)
      milestoneMeshes.push({ mesh: bMesh, baseScale: 1, phase: i * 0.5 })
    }

    // ══════════════════════════════════════════════════════════════════════
    // 7. RULES: PRECISION CRYSTALLINE LATTICE
    // ══════════════════════════════════════════════════════════════════════
    const rulesGroup = environments.rules
    const octGeo = new THREE.OctahedronGeometry(6.0, 1)
    const octMat = new THREE.MeshBasicMaterial({
      color: cyanColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.32 : 0.65,
    })
    const octMesh = new THREE.Mesh(octGeo, octMat)
    rulesGroup.add(octMesh)

    const innerOctGeo = new THREE.OctahedronGeometry(4.0, 0)
    const innerOctMat = new THREE.MeshStandardMaterial({
      color: coreSolidColor,
      metalness: 0.8,
      roughness: 0.1,
      transparent: true,
      opacity: isDark ? 0.4 : 0.65,
    })
    const innerOct = new THREE.Mesh(innerOctGeo, innerOctMat)
    rulesGroup.add(innerOct)

    // ══════════════════════════════════════════════════════════════════════
    // 8. ABOUT: KNOWLEDGE & CAMPUS NETWORK LATTICE
    // ══════════════════════════════════════════════════════════════════════
    const aboutGroup = environments.about
    const latticeGeo = new THREE.DodecahedronGeometry(6.0, 1)
    const latticeMat = new THREE.MeshBasicMaterial({
      color: violetColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.32 : 0.65,
    })
    const latticeMesh = new THREE.Mesh(latticeGeo, latticeMat)
    aboutGroup.add(latticeMesh)

    const innerDodecGeo = new THREE.DodecahedronGeometry(4.0, 0)
    const innerDodecMat = new THREE.MeshStandardMaterial({
      color: coreSolidColor,
      metalness: 0.7,
      roughness: 0.2,
      transparent: true,
      opacity: isDark ? 0.4 : 0.65,
    })
    const innerDodec = new THREE.Mesh(innerDodecGeo, innerDodecMat)
    aboutGroup.add(innerDodec)

    // ══════════════════════════════════════════════════════════════════════
    // INTERACTIVE POINTER DYNAMICS & ANIMATION LOOP
    // ══════════════════════════════════════════════════════════════════════
    let currentOpacity = {
      home: 0,
      dataforge: 0,
      dataduals: 0,
      datamodelling: 0,
      gallery: 0,
      schedule: 0,
      rules: 0,
      about: 0,
    }

    let mouseX = 0
    let mouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0
    let mouseVelocity = 0

    const handleMouseMove = (e) => {
      if (isMobile) return
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      mouseVelocity = Math.sqrt((nx - targetMouseX) ** 2 + (ny - targetMouseY) ** 2) * 5
      targetMouseX = nx
      targetMouseY = ny
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    let animationFrameId
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Pointer velocity decay
      mouseVelocity *= 0.94

      // Smooth pointer damping
      mouseX += (targetMouseX - mouseX) * 0.06
      mouseY += (targetMouseY - mouseY) * 0.06

      // Interactive 3D Camera Parallax
      camera.position.x = mouseX * 2.2
      camera.position.y = -mouseY * 1.8
      camera.lookAt(0, 0, 0)

      // Animate moving data packets in DataForge
      packets.forEach((p) => {
        p.progress += p.speed * (1 + mouseVelocity * 2)
        if (p.progress > 1) p.progress = 0
        p.mesh.position.lerpVectors(p.pathway.start, p.pathway.end, p.progress)
      })

      // Animate milestone beacons in Schedule
      milestoneMeshes.forEach((m) => {
        const s = 1 + Math.sin(elapsedTime * 3 + m.phase) * 0.35
        m.mesh.scale.set(s, s, s)
      })

      // Crossfade logic per environment
      Object.keys(environments).forEach((key) => {
        const isTarget = key === activeMode
        const targetOp = isTarget ? 1 : 0
        currentOpacity[key] += (targetOp - currentOpacity[key]) * 0.06

        const grp = environments[key]
        if (currentOpacity[key] > 0.01) {
          grp.visible = true

          // Interactive 3D Rotation with mouse influence
          if (!prefersReducedMotion) {
            const rotSpeed = 0.08 + mouseVelocity * 0.15
            grp.rotation.y = elapsedTime * rotSpeed + mouseX * 0.4
            grp.rotation.x = Math.sin(elapsedTime * 0.06) * 0.15 + mouseY * 0.3
          }
        } else {
          grp.visible = false
        }
      })

      // Dual rings harmonic breathing
      if (environments.dataduals.visible && !prefersReducedMotion) {
        const separation = Math.sin(elapsedTime * 1.2) * 0.9
        leftRing.position.x = -4.5 - separation - mouseX * 1.2
        rightRing.position.x = 4.5 + separation - mouseX * 1.2
        leftPlasma.rotation.x = elapsedTime * 0.4
        rightPlasma.rotation.y = elapsedTime * 0.4
      }

      // Home Data Core inner rotation
      if (environments.home.visible && !prefersReducedMotion) {
        innerCore.rotation.y = -elapsedTime * 0.12
        innerCore.rotation.z = elapsedTime * 0.08
        dustPoints.rotation.y = elapsedTime * 0.04
      }

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (mountEl && renderer.domElement) {
        mountEl.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [activeMode, isDark])

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-700"
      style={{ opacity: isDark ? 0.88 : 0.82 }}
      aria-hidden="true"
    />
  )
}


