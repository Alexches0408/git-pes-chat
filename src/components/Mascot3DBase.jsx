import React, { useRef, useEffect } from 'react';
import { useFBX, useTexture } from '@react-three/drei';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function Mascot3D({ onClick, scale = 1.1 }) {
  const ref = useRef();
  const mixerRef = useRef(null);

  // Используем правильный путь с BASE_URL
  const mascot = useFBX(`${import.meta.env.BASE_URL}onefile/AnimWorkWing.fbx`);
  
  const { camera } = useThree();

  const lighttexture = useTexture(`${import.meta.env.BASE_URL}textures/whtheme/BaseColor.jpg`);
  lighttexture.anisotropy = 16;
  lighttexture.minFilter = THREE.LinearMipMapLinearFilter;
  lighttexture.magFilter = THREE.LinearFilter;
  lighttexture.encoding = THREE.sRGBEncoding;

  const lmmetalnessMap = useLoader(THREE.TextureLoader, `${import.meta.env.BASE_URL}textures/whtheme/Metalness.jpg`);
  const lmroughnessMap = useLoader(THREE.TextureLoader, `${import.meta.env.BASE_URL}textures/whtheme/Roughness.jpg`);
  const lmnormalMap = useLoader(THREE.TextureLoader, `${import.meta.env.BASE_URL}textures/whtheme/BaseColor.jpg`);
  const lmemissiveMap = useLoader(THREE.TextureLoader, `${import.meta.env.BASE_URL}textures/whtheme/Emissive.jpg`);
  const lmheightMap = useLoader(THREE.TextureLoader, `${import.meta.env.BASE_URL}textures/whtheme/Height.jpg`);

  const eyeTexture = useTexture(`${import.meta.env.BASE_URL}textures/eyes/BaseColor.png`);
  const eyeMetalness = useLoader(THREE.TextureLoader, `${import.meta.env.BASE_URL}textures/eyes/Metalness.png`);
  const eyeRoughness = useLoader(THREE.TextureLoader, `${import.meta.env.BASE_URL}textures/eyes/Roughness.png`);
  const eyeEmissiveMap = useLoader(THREE.TextureLoader, `${import.meta.env.BASE_URL}textures/eyes/Emissive.png`);
  const eyeHeightMap = useLoader(THREE.TextureLoader, `${import.meta.env.BASE_URL}textures/eyes/Height.png`);

  useEffect(() => {
    if (!mascot) return;

    mascot.scale.set(scale, scale, scale);

    mascot.traverse((child) => {
      if (child.isMesh) {
        if (child.name.toLowerCase().includes('eye')) {
          child.material = new THREE.MeshPhysicalMaterial({
            map: eyeTexture,
            metalnessMap: eyeMetalness,
            // roughnessMap: eyeRoughness,
            // metalness: 0.8,
            // roughness: 0.2,
            // clearcoat: 1,
            // clearcoatRoughness: 0.1,
          });
        } else {
          child.material = new THREE.MeshPhysicalMaterial({
            map: lmnormalMap,
            metalnessMap:lmmetalnessMap,
            roughnessMap:lmroughnessMap,
            // emissiveMap:lmemissiveMap,
            // displacementMap: lmheightMap,
            // metalness: 0.1,
            // roughness: 0.7,
            // clearcoat: 0.1,
            // clearcoatRoughness: 0.8,
          });
        }
        // child.castShadow = true;
        // child.receiveShadow = true;
      }
      // if (child.isSkinnedMesh && typeof child.bind === 'function') {
      //   child.bind(child.skeleton, child.matrixWorld);
      // }
    });


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
      ref.current.position.y = floatY - 45;
      ref.current.scale.set(scale, scale, scale);
    }

    camera.position.y = 20;
    camera.position.z = 45;

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
