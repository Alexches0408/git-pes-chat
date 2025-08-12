import React, { useEffect, useRef, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const loader = new FBXLoader();

export default function Mascot3D() {
  const modelRef = useRef();
  const mixerRef = useRef();
  const rigRef = useRef();
  const isMounted = useRef(true);

  const playAnimation = useCallback((path) => {
    if (!rigRef.current || !mixerRef.current) return;

    loader.load(
      path,
      (anim) => {
        if (!isMounted.current) return;

        const clip = anim.animations[0];
        if (!clip) {
          console.warn(`Анимация не найдена в файле: ${path}`);
          return;
        }

        // Плавно затухаем все активные действия
        mixerRef.current.stopAllAction(); // для полной остановки
        // Вместо stopAllAction можно плавно затушевать активные:
        mixerRef.current._actions.forEach((action) => action.fadeOut(0.3));

        const action = mixerRef.current.clipAction(clip);
        action.reset().fadeIn(0.3).play();
      },
      undefined,
      (error) => console.error(`Ошибка загрузки анимации ${path}:`, error)
    );
  }, []);

  useEffect(() => {
    isMounted.current = true;

    loader.load(
      "/twofiles/models/Husky_Rig.fbx",
      (rig) => {
        if (!isMounted.current) return;

        rig.scale.set(0.01, 0.01, 0.01);
        rigRef.current = rig;
        if (modelRef.current) modelRef.current.add(rig);

        mixerRef.current = new THREE.AnimationMixer(rig);

        playAnimation("/twofiles/animations/ANeutral.fbx");
      },
      undefined,
      (error) => console.error("Ошибка загрузки модели:", error)
    );

    return () => {
      isMounted.current = false;

      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
        if (rigRef.current) mixerRef.current.uncacheRoot(rigRef.current);
        mixerRef.current = null;
      }
      if (rigRef.current && modelRef.current) {
        modelRef.current.remove(rigRef.current);
        rigRef.current.traverse((obj) => {
          if (obj.isMesh) {
            obj.geometry.dispose();
            if (Array.isArray(obj.material)) {
              obj.material.forEach((mat) => mat.dispose());
            } else {
              obj.material.dispose();
            }
          }
        });
        rigRef.current = null;
      }
    };
  }, [playAnimation]);

  useFrame((_, delta) => {
    if (mixerRef.current && delta > 0) {
      mixerRef.current.update(delta);
    }
  });

  return <group ref={modelRef} />;
}
