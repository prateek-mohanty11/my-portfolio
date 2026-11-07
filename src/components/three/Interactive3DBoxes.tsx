import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { soundFx } from '../../utils/audio';

interface BoxData {
  mesh: THREE.Mesh;
  edges: THREE.LineSegments;
  innerCore: THREE.Mesh;
  initialPos: THREE.Vector3;
  targetScale: number;
  currentScale: number;
  rotationSpeed: { x: number; y: number; z: number };
  hovered: boolean;
  color: THREE.Color;
}

export const Interactive3DBoxes: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredBoxIndex, setHoveredBoxIndex] = useState<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 9);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Main Group containing all 3D boxes
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLightPurple = new THREE.PointLight(0x9B5CFF, 4, 15);
    pointLightPurple.position.set(4, 3, 4);
    scene.add(pointLightPurple);

    const pointLightCyan = new THREE.PointLight(0x00D9FF, 4, 15);
    pointLightCyan.position.set(-4, -3, 4);
    scene.add(pointLightCyan);

    const centerPointLight = new THREE.PointLight(0xffffff, 2, 8);
    centerPointLight.position.set(0, 0, 3);
    scene.add(centerPointLight);

    // --- Particles Aura ---
    const particlesCount = 80;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const particleColors = new Float32Array(particlesCount * 3);

    const c1 = new THREE.Color(0x9B5CFF);
    const c2 = new THREE.Color(0x00D9FF);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;

      const mixed = Math.random() > 0.5 ? c1 : c2;
      particleColors[i * 3] = mixed.r;
      particleColors[i * 3 + 1] = mixed.g;
      particleColors[i * 3 + 2] = mixed.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // --- 3D Boxes Architecture ---
    const boxesData: BoxData[] = [];

    // Box configurations (positions, sizes, colors)
    const boxConfigs = [
      // Central Hero Cube
      { pos: new THREE.Vector3(0, 0, 0), size: 1.8, color: 0x9B5CFF, accent: 0x00D9FF },
      // Satellite Cubes orbiting around
      { pos: new THREE.Vector3(-2.2, 1.4, 0.6), size: 0.9, color: 0x00D9FF, accent: 0x9B5CFF },
      { pos: new THREE.Vector3(2.3, -1.2, 0.8), size: 1.0, color: 0x9B5CFF, accent: 0x00D9FF },
      { pos: new THREE.Vector3(1.8, 1.8, -0.6), size: 0.8, color: 0x00D9FF, accent: 0x3B82F6 },
      { pos: new THREE.Vector3(-1.9, -1.8, -0.4), size: 0.85, color: 0x3B82F6, accent: 0x00D9FF },
      { pos: new THREE.Vector3(0.1, -2.4, 0.4), size: 0.7, color: 0x9B5CFF, accent: 0x00D9FF },
      { pos: new THREE.Vector3(-0.2, 2.3, -0.5), size: 0.75, color: 0x00D9FF, accent: 0x9B5CFF },
    ];

    boxConfigs.forEach((cfg) => {
      // 1. Outer Box: Glassmorphic Translucent Material
      const boxGeo = new THREE.BoxGeometry(cfg.size, cfg.size, cfg.size);
      
      const boxMat = new THREE.MeshPhysicalMaterial({
        color: 0x10121A,
        emissive: cfg.color,
        emissiveIntensity: 0.12,
        roughness: 0.15,
        metalness: 0.2,
        transparent: true,
        opacity: 0.82,
        reflectivity: 0.9,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1
      });

      const boxMesh = new THREE.Mesh(boxGeo, boxMat);
      boxMesh.position.copy(cfg.pos);

      // 2. Glowing Neon Edges
      const edgesGeo = new THREE.EdgesGeometry(boxGeo);
      const edgesMat = new THREE.LineBasicMaterial({
        color: cfg.accent,
        transparent: true,
        opacity: 0.6,
        linewidth: 1.5
      });
      const edgesLine = new THREE.LineSegments(edgesGeo, edgesMat);
      boxMesh.add(edgesLine);

      // 3. Glowing Inner Core Crystal
      const coreGeo = new THREE.BoxGeometry(cfg.size * 0.45, cfg.size * 0.45, cfg.size * 0.45);
      const coreMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        wireframe: true,
        transparent: true,
        opacity: 0.5
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      boxMesh.add(coreMesh);

      mainGroup.add(boxMesh);

      boxesData.push({
        mesh: boxMesh,
        edges: edgesLine,
        innerCore: coreMesh,
        initialPos: cfg.pos.clone(),
        targetScale: 1,
        currentScale: 1,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.006,
          y: (Math.random() - 0.5) * 0.008,
          z: (Math.random() - 0.5) * 0.004
        },
        hovered: false,
        color: new THREE.Color(cfg.color)
      });
    });

    // --- Interaction Physics & Raycasting ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-100, -100);

    // Mouse coordinates in NDC (-1 to 1)
    let mouseNDC = new THREE.Vector2(0, 0);
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isMouseDown = false;
    let prevMousePos = { x: 0, y: 0 };

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseNDC.x = (x / rect.width) * 2 - 1;
      mouseNDC.y = -(y / rect.height) * 2 + 1;

      mouse.x = mouseNDC.x;
      mouse.y = mouseNDC.y;

      if (!isMouseDown) {
        // Subtle perspective tilt following the cursor
        targetRotationY = mouseNDC.x * 0.45;
        targetRotationX = -mouseNDC.y * 0.35;
      } else {
        // Drag rotation
        const deltaX = e.clientX - prevMousePos.x;
        const deltaY = e.clientY - prevMousePos.y;
        mainGroup.rotation.y += deltaX * 0.006;
        mainGroup.rotation.x += deltaY * 0.006;
        targetRotationY = mainGroup.rotation.y;
        targetRotationX = mainGroup.rotation.x;
        prevMousePos = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      isMouseDown = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isMouseDown = false;
    };

    const onPointerLeave = () => {
      isMouseDown = false;
      mouse.x = -100;
      mouse.y = -100;
      targetRotationX = 0;
      targetRotationY = 0;
      setHoveredBoxIndex(null);
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('mouseleave', onPointerLeave);

    // Touch support for mobile
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        mouseNDC.x = (x / rect.width) * 2 - 1;
        mouseNDC.y = -(y / rect.height) * 2 + 1;
        mouse.x = mouseNDC.x;
        mouse.y = mouseNDC.y;
        targetRotationY = mouseNDC.x * 0.4;
        targetRotationX = -mouseNDC.y * 0.3;
      }
    };
    container.addEventListener('touchmove', onTouchMove, { passive: true });

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // --- Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let prevIntersectIndex: number | null = null;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp group rotation towards cursor tilt
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;

      // Rotate subtle background particles
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = elapsedTime * 0.02;

      // Raycasting for Box Hover detection
      raycaster.setFromCamera(mouse, camera);
      const meshesToTest = boxesData.map(b => b.mesh);
      const intersects = raycaster.intersectObjects(meshesToTest, false);

      let currentlyHoveredIdx: number | null = null;

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const hitIdx = boxesData.findIndex(b => b.mesh === hitMesh);
        if (hitIdx !== -1) {
          currentlyHoveredIdx = hitIdx;
          if (prevIntersectIndex !== hitIdx) {
            soundFx.playHover();
            prevIntersectIndex = hitIdx;
          }
        }
      } else {
        prevIntersectIndex = null;
      }

      setHoveredBoxIndex(currentlyHoveredIdx);

      // Update each box physics and hover responses
      boxesData.forEach((box, idx) => {
        const isHovered = idx === currentlyHoveredIdx;

        // Hover scale and elevation
        box.targetScale = isHovered ? 1.2 : 1;
        box.currentScale += (box.targetScale - box.currentScale) * 0.12;
        box.mesh.scale.set(box.currentScale, box.currentScale, box.currentScale);

        // Floating hover levitation oscillation
        const floatOffset = Math.sin(elapsedTime * 1.5 + idx) * 0.12;
        box.mesh.position.y = box.initialPos.y + floatOffset;

        // Autonomous rotation + accelerated spin on hover
        const spinMultiplier = isHovered ? 3.5 : 1;
        box.mesh.rotation.x += box.rotationSpeed.x * spinMultiplier;
        box.mesh.rotation.y += box.rotationSpeed.y * spinMultiplier;
        box.mesh.rotation.z += box.rotationSpeed.z * spinMultiplier;

        // Inner core counter-rotation
        box.innerCore.rotation.x -= 0.015 * spinMultiplier;
        box.innerCore.rotation.y += 0.02 * spinMultiplier;

        // Dynamic Edge and Emissive Glow on hover
        const mat = box.mesh.material as THREE.MeshPhysicalMaterial;
        const edgeMat = box.edges.material as THREE.LineBasicMaterial;
        const coreMat = box.innerCore.material as THREE.MeshBasicMaterial;

        if (isHovered) {
          mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, 0.75, 0.15);
          mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.95, 0.15);
          edgeMat.opacity = THREE.MathUtils.lerp(edgeMat.opacity, 1.0, 0.2);
          coreMat.opacity = THREE.MathUtils.lerp(coreMat.opacity, 0.9, 0.2);
        } else {
          mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, 0.12, 0.08);
          mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.82, 0.08);
          edgeMat.opacity = THREE.MathUtils.lerp(edgeMat.opacity, 0.6, 0.08);
          coreMat.opacity = THREE.MathUtils.lerp(coreMat.opacity, 0.5, 0.08);
        }
      });

      // Pulse dynamic lights
      pointLightPurple.intensity = 3.5 + Math.sin(elapsedTime * 2) * 1.0;
      pointLightCyan.intensity = 3.5 + Math.cos(elapsedTime * 2) * 1.0;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('mouseleave', onPointerLeave);
      container.removeEventListener('touchmove', onTouchMove);

      // Dispose Three.js resources
      particleGeometry.dispose();
      particleMaterial.dispose();
      boxesData.forEach(b => {
        b.mesh.geometry.dispose();
        if (Array.isArray(b.mesh.material)) {
          b.mesh.material.forEach(m => m.dispose());
        } else {
          b.mesh.material.dispose();
        }
        b.edges.geometry.dispose();
        (b.edges.material as THREE.Material).dispose();
        b.innerCore.geometry.dispose();
        (b.innerCore.material as THREE.Material).dispose();
      });

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] lg:h-[600px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing">
      {/* Dynamic ambient background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#9B5CFF]/25 via-transparent to-[#00D9FF]/20 blur-3xl" />
      </div>

      {/* WebGL Canvas Container */}
      <div ref={containerRef} className="w-full h-full relative z-10" />

      {/* Futuristic Floating Telemetry Badge */}
      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 flex items-center gap-2 pointer-events-auto">
        <div className="px-3 py-1.5 rounded-full bg-[#10121A]/85 border border-white/10 backdrop-blur-md text-[10px] font-mono text-[#A3A8B8] flex items-center gap-2 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-ping" />
          <span>
            {hoveredBoxIndex !== null
              ? `Box Node // 0${hoveredBoxIndex + 1} Focused`
              : "Interactive 3D Boxes • Hover & Drag"}
          </span>
        </div>
      </div>
    </div>
  );
};

