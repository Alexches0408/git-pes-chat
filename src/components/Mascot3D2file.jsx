import React, { useRef, useEffect } from 'react';
import { useFBX } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Mascot3D({ onClick, scale = 0.3 }) {
  const groupRef = useRef();
  const mixerRef = useRef(null);
  
  // Загружаем модель и анимацию
  const mascot = useFBX('/mascot2.fbx');
  const anim = useFBX('/mascot_anim.fbx');

  useEffect(() => {
    if (!mascot || !anim) return;
  
    mascot.scale.set(scale, scale, scale);
  
    mascot.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
      if (child.isSkinnedMesh && typeof child.bind === 'function') {
        child.bind(child.skeleton, child.matrixWorld);
      }
    });
  
    if (anim.animations && anim.animations.length > 0) {
      mixerRef.current = new THREE.AnimationMixer(mascot);
  
      // Важно: клонируем AnimationClip, чтобы избежать ошибок
      const clip = THREE.AnimationClip.parse(JSON.parse(JSON.stringify(anim.animations[0])));
  
      const action = mixerRef.current.clipAction(clip);
      action.reset().play();
    }
  }, [mascot, anim, scale]);

  useFrame((_, delta) => {
    const t = performance.now() / 1000;
    const floatY = Math.sin(t * 2) * 0.1;
  
    if (groupRef.current) {
      groupRef.current.position.y = floatY - 6;
        groupRef.current.scale.set(scale, scale, scale);
    }
  
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  if (!mascot || !anim) return null;

  return (
    <group ref={groupRef} onClick={onClick} style={{ cursor: 'pointer' }}>
      <primitive object={mascot} />
    </group>
  );
}
