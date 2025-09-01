import React, { useRef, useEffect, useMemo } from 'react';
import { useFBX, useTexture, useAnimations } from '@react-three/drei';
import { useFrame, useLoader, useThree } from '@react-three/fiber';

import * as THREE from 'three';

export default function Mascot3D({ onClick, scale = 1, position = [0, 0, 0]  }) {
  const ref = useRef();
  const mixerRef = useRef(null);

  // Используем правильный путь с BASE_URL
  const mascot = useFBX(`${import.meta.env.BASE_URL}AnimWorkSmile.fbx`);
  const { actions } = useAnimations(mascot.animations, mascot);
  
  const { camera } = useThree();

  const wttexture = useTexture(`${import.meta.env.BASE_URL}textures/whtheme/BaseColor.jpg`);
  wttexture.anisotropy = 16;
  wttexture.minFilter = THREE.LinearMipMapLinearFilter;
  wttexture.magFilter = THREE.LinearFilter;
  wttexture.encoding = THREE.sRGBEncoding;

  const wtmetalnessMap = useLoader(THREE.TextureLoader, `${import.meta.env.BASE_URL}textures/whtheme/Metalness.jpg`);
  const wtroughnessMap = useLoader(THREE.TextureLoader, `${import.meta.env.BASE_URL}textures/whtheme/Roughness.jpg`);
  const wtnormalMap = useLoader(THREE.TextureLoader, `${import.meta.env.BASE_URL}textures/whtheme/Normal.jpg`);
  const wtemissiveMap = useLoader(THREE.TextureLoader, `${import.meta.env.BASE_URL}textures/whtheme/Emissive.jpg`);
  const wtheightMap = useLoader(THREE.TextureLoader, `${import.meta.env.BASE_URL}textures/whtheme/Height.jpg`);

  const wteyeTexture = useTexture(`${import.meta.env.BASE_URL}textures/wteyes/BaseColor.jpg`);
  const wteyeMetalness = useLoader(THREE.TextureLoader, `${import.meta.env.BASE_URL}textures/wteyes/Metalness.jpg`);
  const wteyeRoughness = useLoader(THREE.TextureLoader, `${import.meta.env.BASE_URL}textures/wteyes/Roughness.jpg`);
  const wteyenormalMap = useLoader(THREE.TextureLoader, `${import.meta.env.BASE_URL}textures/wteyes/Normal.jpg`);
  const wteyeEmissiveMap = useLoader(THREE.TextureLoader, `${import.meta.env.BASE_URL}textures/wteyes/Emissive.jpg`);
  const wteyeHeightMap = useLoader(THREE.TextureLoader, `${import.meta.env.BASE_URL}textures/wteyes/Height.jpg`);


  const wtMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    map: wttexture,
    metalnessMap: wtmetalnessMap,
    roughnessMap: wtroughnessMap,
    normalMap: wtnormalMap,
    emissiveMap: wtemissiveMap,
    displacementMap: wtheightMap,
    displacementScale: 0.05,
    emissive: new THREE.Color(0xffffff),
    emissiveIntensity: 0.5,
  }), [wttexture, wtmetalnessMap, wtroughnessMap, wtnormalMap, wtemissiveMap, wtheightMap]);

  const wtEyesMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    map: wteyeTexture,                // цвет
    metalnessMap: wteyeMetalness,  // металл
    roughnessMap: wteyeRoughness,  // шероховатость
    normalMap: wteyenormalMap,        // нормали
    emissiveMap: wteyeEmissiveMap,    // свечение
    displacementMap: wteyeHeightMap,  // высотная карта
    displacementScale: 0.05,       // сила рельефа
    emissive: new THREE.Color(0xffffff),
    emissiveIntensity: 0.5,
  }), [wteyeTexture, wteyeMetalness, wteyeRoughness, wteyenormalMap, wteyeEmissiveMap, wteyeHeightMap]);


  useEffect(() => {
    if (!mascot) return;

    mascot.scale.set(scale, scale, scale);

    mascot.traverse((child) => {
      if (child.isMesh) {
        if (child.name.toLowerCase().includes("eye")) {
          child.material = wtEyesMaterial;
        } else {
          child.material = wtMaterial;
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
  }, [mascot, scale, actions, wtMaterial, wtEyesMaterial]);

  
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      const floatY = Math.sin(t * 2) * 0.01; // небольшое движение вверх/вниз
      ref.current.position.y = position[1] + floatY; // учитываем базовую Y
    }
  });

  if (!mascot) return null;

  return (
    <group ref={ref} onClick={onClick} position={position} scale={scale} style={{ cursor: 'pointer' }}>
      <primitive object={mascot} />
    </group>
  );
}
