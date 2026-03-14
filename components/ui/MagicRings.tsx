import React, { useEffect, useRef } from 'react';
import './MagicRings.css';
import * as THREE from 'three';

interface MagicRingsProps {
  className?: string;
  ringCount?: number;
  speed?: number;
  followMouse?: boolean;
}

const MagicRings: React.FC<MagicRingsProps> = ({
  className = '',
  ringCount = 5,
  speed = 0.32,
  followMouse = true
}) => {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    const root = new THREE.Group();
    root.rotation.x = 0.6;
    scene.add(root);

    const glow = new THREE.Mesh(
      new THREE.RingGeometry(1.6, 3.8, 96),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#22d3ee'),
        transparent: true,
        opacity: 0.06,
        side: THREE.DoubleSide
      })
    );
    glow.rotation.z = Math.PI / 10;
    root.add(glow);

    const rings: THREE.Object3D[] = [];
    const colors = ['#5eead4', '#38bdf8', '#3b82f6', '#6d7dff', '#8b5cf6'];

    for (let index = 0; index < ringCount; index += 1) {
      const radius = 1.2 + index * 0.4;
      const tube = 0.028 + index * 0.004;
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tube, 18, 160),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(colors[index % colors.length]),
          transparent: true,
          opacity: index === 0 ? 0.78 : 0.42 - index * 0.03
        })
      );

      ring.rotation.x = 1.15 + index * 0.14;
      ring.rotation.y = index * 0.42;
      ring.rotation.z = index * 0.2;
      root.add(ring);
      rings.push(ring);
    }

    const particles = new THREE.Group();
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 64;
    const particlePositions = new Float32Array(particleCount * 3);

    for (let index = 0; index < particleCount; index += 1) {
      const angle = Math.random() * Math.PI * 2;
      const spread = 2.2 + Math.random() * 2.1;
      particlePositions[index * 3] = Math.cos(angle) * spread;
      particlePositions[index * 3 + 1] = Math.sin(angle) * spread;
      particlePositions[index * 3 + 2] = (Math.random() - 0.5) * 1.1;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color('#8fdcff'),
      size: 0.03,
      transparent: true,
      opacity: 0.4
    });
    const pointCloud = new THREE.Points(particleGeometry, particleMaterial);
    particles.add(pointCloud);
    root.add(particles);

    const pointer = { x: 0, y: 0 };
    const targetRotation = { x: root.rotation.x, y: root.rotation.y };
    let frameId = 0;

    const resize = () => {
      const { clientWidth, clientHeight } = host;
      if (!clientWidth || !clientHeight) return;

      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!followMouse) return;
      const rect = host.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
      pointer.y = (event.clientY - rect.top) / rect.height - 0.5;
      targetRotation.y = pointer.x * 0.45;
      targetRotation.x = 0.6 + pointer.y * -0.28;
    };

    const onPointerLeave = () => {
      targetRotation.x = 0.6;
      targetRotation.y = 0;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);

    host.addEventListener('pointermove', onPointerMove);
    host.addEventListener('pointerleave', onPointerLeave);
    resize();

    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      root.rotation.x += (targetRotation.x - root.rotation.x) * 0.045;
      root.rotation.y += (targetRotation.y - root.rotation.y) * 0.045;
      root.rotation.z = Math.sin(elapsed * 0.16) * 0.1;

      rings.forEach((ring, index) => {
        ring.rotation.z += speed * 0.0025 * (index % 2 === 0 ? 1 : -1);
        ring.rotation.x += speed * 0.0008 * (index + 1);
      });

      particles.rotation.z = elapsed * 0.05;
      particles.rotation.x = Math.sin(elapsed * 0.22) * 0.1;

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerleave', onPointerLeave);

      particleGeometry.dispose();
      particleMaterial.dispose();
      glow.geometry.dispose();
      (glow.material as THREE.Material).dispose();

      rings.forEach((ring) => {
        const mesh = ring as THREE.Mesh;
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });

      renderer.dispose();
      if (host.contains(renderer.domElement)) {
        host.removeChild(renderer.domElement);
      }
    };
  }, [followMouse, ringCount, speed]);

  return (
    <div className={`magic-rings ${className}`.trim()} aria-hidden="true">
      <div ref={hostRef} className="magic-rings__canvas" />
      <div className="magic-rings__veil" />
    </div>
  );
};

export default MagicRings;
