import React, { useRef, useEffect } from 'react';
import { useFBX, useTexture } from '@react-three/drei';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function Mascot3D({ onClick, scale = 0.8 }) {
  const ref = useRef();
  const mixerRef = useRef(null);
  const mascot = useFBX('/AnimWorkPensive.fbx');
  
  // Получаем камеру из контекста сцены
  const { camera } = useThree();

  // Текстуры для светлой темы
  const lighttexture = useTexture('/textures/whtheme/BaseColor.jpg');
  lighttexture.anisotropy = 16;
  lighttexture.minFilter = THREE.LinearMipMapLinearFilter;
  lighttexture.magFilter = THREE.LinearFilter;
  lighttexture.encoding = THREE.sRGBEncoding;

  const lmmetalnessMap = useLoader(THREE.TextureLoader, '/textures/whtheme/Metalness.jpg');
  const lmroughnessMap = useLoader(THREE.TextureLoader, '/textures/whtheme/Roughness.jpg');
  const lmnormalMap = useLoader(THREE.TextureLoader, '/textures/whtheme/BaseColor.jpg');
  const lmemissiveMap = useLoader(THREE.TextureLoader, '/textures/whtheme/Emissive.jpg');
  const lmheightMap = useLoader(THREE.TextureLoader, '/textures/whtheme/Height.jpg');

  // Текстуры для глаз
  const eyeTexture = useTexture('/textures/eyes/BaseColor.png');
  const eyeMetalness = useLoader(THREE.TextureLoader, '/textures/eyes/Metalness.png');
  const eyeRoughness = useLoader(THREE.TextureLoader, '/textures/eyes/Roughness.png');

  useEffect(() => {
    if (!mascot) return;

    mascot.scale.set(scale, scale, scale);

    // mascot.traverse((child) => {
    //   if (child.isMesh) {
    //     if (child.name.toLowerCase().includes('eye')) {
    //       child.material = new THREE.MeshPhysicalMaterial({
    //         //  map: eyeTexture,
    //         // metalnessMap: eyeMetalness,
    //         // roughnessMap: eyeRoughness,
    //         // metalness: 0.8,
    //         // roughness: 0.2,
    //         // clearcoat: 1,
    //         // clearcoatRoughness: 0.1,
    //       });
    //     } else {
    //       child.material = new THREE.MeshPhysicalMaterial({
    //         // map: lighttexture,
    //         // metalnessMap: lmmetalnessMap,
    //         // roughnessMap: lmroughnessMap,
    //         // normalMap: lmnormalMap,
    //         // emissiveMap: lmemissiveMap,
    //         // heightMap: lmheightMap,
    //         // metalness: 0.1,
    //         // roughness: 0.7,
    //         // clearcoat: 0.1,
    //         // clearcoatRoughness: 0.8,
    //       });
    //     }
    //     // child.castShadow = true;
    //     // child.receiveShadow = true;
    //   }
    //   if (child.isSkinnedMesh && typeof child.bind === 'function') {
    //     child.bind(child.skeleton, child.matrixWorld);
    //   }
    // });

    if (mascot.animations && mascot.animations.length > 0) {
      mixerRef.current = new THREE.AnimationMixer(mascot);
      const action = mixerRef.current.clipAction(mascot.animations[0]);
      action.play();
    }
  }, [mascot, scale]);

  useFrame(({ clock }, delta) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      const floatY = Math.sin(t * 2) * 0.01;
      ref.current.position.y = floatY - 2;
      ref.current.scale.set(scale, scale, scale);
    }
    camera.position.y = 30
    

    camera.position.z = 30

    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  if (!mascot) return null;

  return (
    <group ref={ref} onClick={onClick} style={{ cursor: 'pointer' }}>
      <primitive object={mascot} />
    </group>
  );
}