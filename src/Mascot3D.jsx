import React, { useRef, useEffect } from 'react';
import { useFBX } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function Mascot3D() {
  const ref = useRef();
  const model = useFBX('/mascot.fbx');

  useEffect(() => {
    model.scale.set(0.03, 0.03, 0.03); // подогнать под Canvas
    model.position.set(0, -0.5, 0); // немного опустить
    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [model]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.y = Math.sin(t * 2) * 0.03;
      const pulse = 1 + Math.sin(t * 2) * 0.05;
      ref.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={ref}>
      <primitive object={model} />
    </group>
  );
}
