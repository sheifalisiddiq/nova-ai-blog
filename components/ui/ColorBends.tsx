import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ColorBends.css';

interface ColorBendsProps {
  className?: string;
}

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspectUv = uv;
    aspectUv.x *= uResolution.x / max(uResolution.y, 1.0);

    vec2 mouseOffset = (uMouse - 0.5) * 0.08;
    aspectUv += mouseOffset;

    float waveA = sin((aspectUv.x + uTime * 0.06) * 6.0) * 0.5 + 0.5;
    float waveB = cos((aspectUv.y - uTime * 0.05) * 7.0) * 0.5 + 0.5;
    float flow = noise(aspectUv * 3.6 + vec2(uTime * 0.03, -uTime * 0.025));

    float blend1 = smoothstep(0.15, 0.85, waveA * 0.62 + flow * 0.38);
    float blend2 = smoothstep(0.2, 0.95, waveB * 0.55 + flow * 0.45);

    vec3 color = mix(uColorA, uColorB, blend1);
    color = mix(color, uColorC, blend2 * 0.72);

    float vignette = smoothstep(1.1, 0.2, distance(vUv, vec2(0.5)));
    color *= mix(0.68, 1.02, vignette);

    gl_FragColor = vec4(color, 0.58);
  }
`;

const ColorBends: React.FC<ColorBendsProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const uniforms = {
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color('#22d3ee') },
      uColorB: { value: new THREE.Color('#3b82f6') },
      uColorC: { value: new THREE.Color('#8b5cf6') }
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      depthTest: false
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const pointer = new THREE.Vector2(0.5, 0.5);
    const pointerTarget = new THREE.Vector2(0.5, 0.5);
    let rafId = 0;

    const resize = () => {
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width, height);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / Math.max(rect.width, 1);
      const y = 1 - (event.clientY - rect.top) / Math.max(rect.height, 1);

      pointerTarget.set(THREE.MathUtils.clamp(x, 0, 1), THREE.MathUtils.clamp(y, 0, 1));
    };

    const clock = new THREE.Clock();

    const animate = () => {
      pointer.lerp(pointerTarget, 0.055);
      uniforms.uMouse.value.copy(pointer);
      uniforms.uTime.value = clock.getElapsedTime();

      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    container.addEventListener('pointermove', onPointerMove);

    resize();
    animate();

    return () => {
      window.cancelAnimationFrame(rafId);
      container.removeEventListener('pointermove', onPointerMove);
      resizeObserver.disconnect();

      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={`color-bends ${className}`.trim()} aria-hidden="true" />;
};

export default ColorBends;
