import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations } from '@react-three/drei';
import { useMascotAssets } from "./MascotProvider";

export default function Mascot3DBase({ onClick, scale = 1, position = [0, 0, 0] }) {
  const ref = useRef();
  const { mascot, materials } = useMascotAssets();
  const { actions } = useAnimations(mascot.animations, mascot);

  useEffect(() => {
    if (!mascot) return;

    mascot.scale.set(scale, scale, scale);

    mascot.traverse((child) => {
      if (child.isMesh) {
        if (child.name.toLowerCase().includes("eye")) {
          child.material = materials.wteyesMaterial;
        } else {
          child.material = materials.wtbodyMaterial;
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    if (actions) {
      const keys = Object.keys(actions);
      if (keys.length > 0) {
        actions[keys[0]].reset().fadeIn(1).play();
      }
    }
  }, [mascot, materials, scale, actions]);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      const floatY = Math.sin(t * 2) * 0.01;
      ref.current.position.y = position[1] + floatY;
    }
  });

  if (!mascot) return null;

  return (
    <group ref={ref} onClick={onClick} position={position} scale={scale} style={{ cursor: "pointer" }}>
      <primitive object={mascot} />
    </group>
  );
}

