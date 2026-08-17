import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Convert equirectangular texture UV (0..1) to precise 3D Sphere coordinates
// Matches Three.js SphereGeometry internal vertex generation
function textureUVToVector3(u, v_from_top, radius = 2.1) {
  const theta = u * Math.PI * 2
  const phi = v_from_top * Math.PI

  const x = -radius * Math.cos(theta) * Math.sin(phi)
  const y = radius * Math.cos(phi)
  const z = radius * Math.sin(theta) * Math.sin(phi)

  return new THREE.Vector3(x, y, z)
}

// Exact pixel-calibrated coordinates for Nagpur, Maharashtra on earth_satellite_map.jpg
// u = 0.723 (72.3% from left), v_from_top = 0.385 (38.5% from North Pole)
const NAGPUR_U = 0.705
const NAGPUR_V = 0.400

export default function SplashGlobe({ onEnterPortal }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const width = window.innerWidth
    const height = window.innerHeight

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000)
    camera.position.set(0, 3.0, 5.0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // 2. Starfield in deep space
    const starCount = 900
    const starGeo = new THREE.BufferGeometry()
    const starPos = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 85
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 85
      starPos[i * 3 + 2] = -15 - Math.random() * 45
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    const starMat = new THREE.PointsMaterial({
      size: 0.09,
      color: new THREE.Color('#CBD5E1'),
      transparent: true,
      opacity: 0.75,
    })
    scene.add(new THREE.Points(starGeo, starMat))

    // 3. Lighting (Directional Sun + Ambient Space Glow)
    const sunLight = new THREE.DirectionalLight('#FFFFFF', 2.2)
    sunLight.position.set(6, 3, 5)
    scene.add(sunLight)

    const ambientLight = new THREE.AmbientLight('#1E293B', 0.85)
    scene.add(ambientLight)

    // 4. Master Globe Group
    const globeGroup = new THREE.Group()
    scene.add(globeGroup)

    const radius = 2.1

    // Texture Loader
    const textureLoader = new THREE.TextureLoader()

    // 5. Photorealistic Satellite Earth Surface
    const earthGeo = new THREE.SphereGeometry(radius, 64, 64)
    const earthTex = textureLoader.load('/assets/earth_satellite_map.jpg')
    earthTex.colorSpace = THREE.SRGBColorSpace

    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTex,
      roughness: 0.75,
      metalness: 0.1,
    })
    const earthMesh = new THREE.Mesh(earthGeo, earthMat)
    globeGroup.add(earthMesh)

    // 6. Volumetric Drifting Clouds Layer
    const cloudsGeo = new THREE.SphereGeometry(radius + 0.016, 64, 64)
    const cloudsTex = textureLoader.load('/assets/earth_clouds_map.jpg')
    cloudsTex.colorSpace = THREE.SRGBColorSpace

    const cloudsMat = new THREE.MeshStandardMaterial({
      map: cloudsTex,
      transparent: true,
      opacity: 0.36,
      blending: THREE.AdditiveBlending,
    })
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat)
    globeGroup.add(cloudsMesh)

    // 7. Atmospheric Blue Glow Rim Shader
    const haloGeo = new THREE.SphereGeometry(radius * 1.15, 36, 36)
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
          float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.5);
          gl_FragColor = vec4(0.25, 0.7, 1.0, 1.0) * intensity * 0.8;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    })
    scene.add(new THREE.Mesh(haloGeo, haloMat))

    // 8. Precise Pinpoint Beacon for TGPCET Nagpur, Maharashtra
    const nagpurLocalPos = textureUVToVector3(NAGPUR_U, NAGPUR_V, radius + 0.02)
    const nagpurGroup = new THREE.Group()
    nagpurGroup.position.copy(nagpurLocalPos)
    globeGroup.add(nagpurGroup)

    // Bright green pinpoint beacon core
    const beaconCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.038, 16, 16),
      new THREE.MeshBasicMaterial({ color: new THREE.Color('#00FF9D') })
    )
    nagpurGroup.add(beaconCore)

    // Expanding radar pulse ring
    const ringGeo = new THREE.RingGeometry(0.045, 0.08, 32)
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#00FF9D'),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
    })
    const ringMesh = new THREE.Mesh(ringGeo, ringMat)
    ringMesh.lookAt(nagpurLocalPos.clone().multiplyScalar(2))
    nagpurGroup.add(ringMesh)

    // Vertical beacon light pin
    const pinGeo = new THREE.CylinderGeometry(0.006, 0.006, 0.32, 8)
    const pinMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#00FF9D'),
      transparent: true,
      opacity: 0.85,
    })
    const pinMesh = new THREE.Mesh(pinGeo, pinMat)
    pinMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), nagpurLocalPos.clone().normalize())
    pinMesh.position.copy(nagpurLocalPos.clone().multiplyScalar(0.06))
    globeGroup.add(pinMesh)

    // 9. Roaming 3D Rockets & Satellites around the Earth
    function createRocket(color = '#00C2FF', thrusterColor = '#FF7A00') {
      const rocketGroup = new THREE.Group()

      // Rocket Fuselage Body
      const bodyGeo = new THREE.CylinderGeometry(0.022, 0.028, 0.16, 12)
      const bodyMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#F8FAFC'),
        metalness: 0.8,
        roughness: 0.2,
      })
      const body = new THREE.Mesh(bodyGeo, bodyMat)
      body.rotation.z = Math.PI / 2
      rocketGroup.add(body)

      // Pointed Aerodynamic Nose Cone
      const noseGeo = new THREE.ConeGeometry(0.022, 0.07, 12)
      const noseMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        metalness: 0.5,
        roughness: 0.3,
      })
      const nose = new THREE.Mesh(noseGeo, noseMat)
      nose.rotation.z = -Math.PI / 2
      nose.position.x = 0.115
      rocketGroup.add(nose)

      // 4 Rocket Booster Fins
      const finGeo = new THREE.BoxGeometry(0.04, 0.004, 0.035)
      const finMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(color) })
      
      const fin1 = new THREE.Mesh(finGeo, finMat)
      fin1.position.set(-0.06, 0.03, 0)
      rocketGroup.add(fin1)

      const fin2 = new THREE.Mesh(finGeo, finMat)
      fin2.position.set(-0.06, -0.03, 0)
      rocketGroup.add(fin2)

      const fin3 = new THREE.Mesh(finGeo, finMat)
      fin3.rotation.x = Math.PI / 2
      fin3.position.set(-0.06, 0, 0.03)
      rocketGroup.add(fin3)

      const fin4 = new THREE.Mesh(finGeo, finMat)
      fin4.rotation.x = Math.PI / 2
      fin4.position.set(-0.06, 0, -0.03)
      rocketGroup.add(fin4)

      // Solar Panels / Wings
      const wingGeo = new THREE.BoxGeometry(0.03, 0.12, 0.003)
      const wingMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1E293B'),
        roughness: 0.2,
      })
      const wings = new THREE.Mesh(wingGeo, wingMat)
      wings.position.set(0.01, 0, 0)
      rocketGroup.add(wings)

      // Glowing Rocket Engine Exhaust Plume
      const flameGeo = new THREE.ConeGeometry(0.018, 0.09, 8)
      const flameMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(thrusterColor),
        transparent: true,
        opacity: 0.9,
      })
      const flame = new THREE.Mesh(flameGeo, flameMat)
      flame.rotation.z = Math.PI / 2
      flame.position.x = -0.125
      rocketGroup.add(flame)

      return { group: rocketGroup, flame: flame }
    }

    const rocketOrbits = [
      { radiusX: 3.1, radiusZ: 2.7, speed: 0.95, tiltX: 0.45, tiltZ: 0.3, color: '#00C2FF', thruster: '#00E5FF' },
      { radiusX: 3.6, radiusZ: 3.2, speed: -0.75, tiltX: -0.5, tiltZ: 0.7, color: '#FF0055', thruster: '#FFAA00' },
      { radiusX: 2.8, radiusZ: 3.4, speed: 1.1, tiltX: 0.8, tiltZ: -0.4, color: '#00FF9D', thruster: '#00FF9D' },
      { radiusX: 4.1, radiusZ: 3.8, speed: -0.6, tiltX: -0.2, tiltZ: -0.6, color: '#8B5CF6', thruster: '#C084FC' },
    ]

    const rocketsList = []

    rocketOrbits.forEach((cfg) => {
      const orbitContainer = new THREE.Group()
      orbitContainer.rotation.x = cfg.tiltX
      orbitContainer.rotation.z = cfg.tiltZ
      scene.add(orbitContainer)

      const trailPoints = 80
      const trailPositions = new Float32Array((trailPoints + 1) * 3)
      for (let t = 0; t <= trailPoints; t++) {
        const ang = (t / trailPoints) * Math.PI * 2
        trailPositions[t * 3] = Math.cos(ang) * cfg.radiusX
        trailPositions[t * 3 + 1] = 0
        trailPositions[t * 3 + 2] = Math.sin(ang) * cfg.radiusZ
      }
      const trailGeo = new THREE.BufferGeometry()
      trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3))
      const trailMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(cfg.color),
        transparent: true,
        opacity: 0.22,
      })
      orbitContainer.add(new THREE.Line(trailGeo, trailMat))

      const rocket = createRocket(cfg.color, cfg.thruster)
      orbitContainer.add(rocket.group)

      rocketsList.push({
        rocketGroup: rocket.group,
        flame: rocket.flame,
        cfg: cfg,
        angle: Math.random() * Math.PI * 2,
      })
    })

    // Calculate rotation to place Nagpur directly facing the camera
    const targetTheta = NAGPUR_U * Math.PI * 2
    const targetPhi = NAGPUR_V * Math.PI
    const targetRotY = -targetTheta + Math.PI / 2
    const targetRotX = targetPhi - Math.PI / 2

    // Initial globe orientation so it rotates naturally into view
    globeGroup.rotation.y = targetRotY - 0.7
    globeGroup.rotation.x = targetRotX - 0.05

    let frameId
    let startTime = performance.now()
    let pulseScale = 1
    let redirected = false

    // To store initial camera position at t = 3.0s for precise interpolation
    const startCamPos = new THREE.Vector3(0, 0, 6.0)
    let zoomInitialized = false

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const now = performance.now()
      const elapsedSeconds = (now - startTime) / 1000

      // Update roaming rockets
      rocketsList.forEach((r) => {
        r.angle += r.cfg.speed * 0.014
        const curX = Math.cos(r.angle) * r.cfg.radiusX
        const curZ = Math.sin(r.angle) * r.cfg.radiusZ
        r.rocketGroup.position.set(curX, 0, curZ)

        const nextX = Math.cos(r.angle + 0.05 * Math.sign(r.cfg.speed)) * r.cfg.radiusX
        const nextZ = Math.sin(r.angle + 0.05 * Math.sign(r.cfg.speed)) * r.cfg.radiusZ
        const dir = new THREE.Vector3(nextX - curX, 0, nextZ - curZ).normalize()
        r.rocketGroup.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), dir)

        r.flame.scale.set(1 + Math.random() * 0.4, 1 + Math.random() * 0.3, 1 + Math.random() * 0.3)
      })

      // Slowly rotate clouds
      cloudsMesh.rotation.y += 0.0012

      // Pulse Nagpur beacon radar ring
      pulseScale += 0.026
      if (pulseScale > 2.5) pulseScale = 1
      ringMesh.scale.set(pulseScale, pulseScale, pulseScale)
      ringMat.opacity = Math.max(0, 1 - (pulseScale - 1) / 1.5)

      if (elapsedSeconds < 3.0) {
        // First 3 seconds: Satellite Earth rotates smoothly, bringing Nagpur into forward view
        globeGroup.rotation.y += 0.007
        camera.lookAt(0, 0, 0)
      } else {
        // PRECISE VIRAL ZOOM DIRECTLY INTO THE GREEN DOT (TGPCET NAGPUR)
        if (!zoomInitialized) {
          startCamPos.copy(camera.position)
          zoomInitialized = true
        }

        const zoomElapsed = elapsedSeconds - 3.0
        const zoomDuration = 1.05
        const zoomT = Math.min(1, zoomElapsed / zoomDuration)
        // Cubic ease-in-out curve for dramatic hyper-zoom feel
        const easeZoom = zoomT < 0.5
          ? 4 * zoomT * zoomT * zoomT
          : 1 - Math.pow(-2 * zoomT + 2, 3) / 2

        // Rotate globe to lock Nagpur directly forward
        globeGroup.rotation.y = THREE.MathUtils.lerp(globeGroup.rotation.y, targetRotY, 0.12)
        globeGroup.rotation.x = THREE.MathUtils.lerp(globeGroup.rotation.x, targetRotX, 0.12)

        // Get the EXACT real-time 3D world position of the green dot
        const dotWorldPos = new THREE.Vector3()
        beaconCore.getWorldPosition(dotWorldPos)

        // Target camera destination right on top of the green dot along its normal vector
        const dotNormal = dotWorldPos.clone().normalize()
        const targetCamPos = dotNormal.clone().multiplyScalar(radius + 0.12)

        // Interpolate camera position directly along vector into the green dot
        camera.position.lerpVectors(startCamPos, targetCamPos, easeZoom)

        // Keep camera looking DEAD-CENTER at the green dot throughout the entire dive
        camera.lookAt(dotWorldPos)

        // When zoom completes, smoothly redirect into home portal
        if (zoomT >= 0.98 && !redirected) {
          redirected = true
          onEnterPortal()
        }
      }

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      if (!container) return
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(frameId)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [onEnterPortal])

  return (
    <div className="fixed inset-0 z-50 bg-[#020612] flex items-center justify-center overflow-hidden select-none">
      {/* 3D Photorealistic Satellite View of Earth + Roaming Rockets */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}
