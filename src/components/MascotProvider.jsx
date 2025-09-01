import React, { createContext, useContext, useMemo } from "react";
import { useFBX, useTexture } from "@react-three/drei";
import * as THREE from "three";

const MascotContext = createContext(null);

export function MascotProvider({ children }) {
  const mascot = useFBX(`${import.meta.env.BASE_URL}AnimWorkSmile.fbx`);

  const wttextures = useTexture({
    base: `${import.meta.env.BASE_URL}textures/whtheme/BaseColor.jpg`,
    metal: `${import.meta.env.BASE_URL}textures/whtheme/Metalness.jpg`,
    rough: `${import.meta.env.BASE_URL}textures/whtheme/Roughness.jpg`,
    normal: `${import.meta.env.BASE_URL}textures/whtheme/Normal.jpg`,
    emissive: `${import.meta.env.BASE_URL}textures/whtheme/Emissive.jpg`,
    height: `${import.meta.env.BASE_URL}textures/whtheme/Height.jpg`,
  });

  const wteyestextures = useTexture({
    base: `${import.meta.env.BASE_URL}textures/wteyes/BaseColor.jpg`,
    metal: `${import.meta.env.BASE_URL}textures/wteyes/Metalness.jpg`,
    rough: `${import.meta.env.BASE_URL}textures/wteyes/Roughness.jpg`,
    normal: `${import.meta.env.BASE_URL}textures/wteyes/Normal.jpg`,
    emissive: `${import.meta.env.BASE_URL}textures/wteyes/Emissive.jpg`,
    height: `${import.meta.env.BASE_URL}textures/wteyes/Height.jpg`,
  });

  const dttextures = useTexture({
    base: `${import.meta.env.BASE_URL}textures/darktheme/BaseColor.jpg`,
    metal: `${import.meta.env.BASE_URL}textures/darktheme/Metalness.jpg`,
    rough: `${import.meta.env.BASE_URL}textures/darktheme/Roughness.jpg`,
    normal: `${import.meta.env.BASE_URL}textures/darktheme/Normal.jpg`,
    emissive: `${import.meta.env.BASE_URL}textures/darktheme/Emissive.jpg`,
    height: `${import.meta.env.BASE_URL}textures/darktheme/Height.jpg`,
  });

  const dteyestextures = useTexture({
    base: `${import.meta.env.BASE_URL}textures/dteyes/BaseColor.jpg`,
    metal: `${import.meta.env.BASE_URL}textures/dteyes/Metalness.jpg`,
    rough: `${import.meta.env.BASE_URL}textures/dteyes/Roughness.jpg`,
    normal: `${import.meta.env.BASE_URL}textures/dteyes/Normal.jpg`,
    emissive: `${import.meta.env.BASE_URL}textures/dteyes/Emissive.jpg`,
    height: `${import.meta.env.BASE_URL}textures/dteyes/Height.jpg`,
  });


  const materials = useMemo(() => {
    const wtbodyMaterial = new THREE.MeshStandardMaterial({
      map: wttextures.base,
      metalnessMap: wttextures.metal,
      roughnessMap: wttextures.rough,
      normalMap: wttextures.normal,
      emissiveMap: wttextures.emissive,
      displacementMap: wttextures.height,
      displacementScale: 0.05,
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.5,
    });

    const wteyesMaterial = new THREE.MeshStandardMaterial({
        map: wteyestextures.base,
        metalnessMap: wteyestextures.metal,
        roughnessMap: wteyestextures.rough,
        normalMap: wteyestextures.normal,
        emissiveMap: wteyestextures.emissive,
        displacementMap: wteyestextures.height,
        displacementScale: 0.05,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 0.5,
      });

      const dtbodyMaterial = new THREE.MeshStandardMaterial({
        map: dttextures.base,
        metalnessMap: dttextures.metal,
        roughnessMap: dttextures.rough,
        normalMap: dttextures.normal,
        emissiveMap: dttextures.emissive,
        displacementMap: dttextures.height,
        displacementScale: 0.05,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 0.5,
      });
  
      const dteyesMaterial = new THREE.MeshStandardMaterial({
          map: dteyestextures.base,
          metalnessMap: dteyestextures.metal,
          roughnessMap: dteyestextures.rough,
          normalMap: dteyestextures.normal,
          emissiveMap: dteyestextures.emissive,
          displacementMap: dteyestextures.height,
          displacementScale: 0.05,
          emissive: new THREE.Color(0xffffff),
          emissiveIntensity: 0.5,
        });

    return { wtbodyMaterial, wteyesMaterial, dtbodyMaterial, dteyesMaterial };
  }, [wttextures, wteyestextures, dttextures, dteyestextures]);

  return (
    <MascotContext.Provider value={{ mascot, materials }}>
      {children}
    </MascotContext.Provider>
  );
}

export const useMascotAssets = () => useContext(MascotContext);