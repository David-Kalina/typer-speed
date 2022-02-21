import { PerspectiveCamera } from '@react-three/drei'
import React, { useEffect, useState } from 'react'

function Camera() {
  const [{ x, y }, setPosition] = useState({
    x: 0,
    y: 0,
  })

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setPosition(prev => ({
  //         x: prev.x + 11,
  //         y: prev.y + 0.01,
  //       }))
  //     })
  //     return () => {
  //       clearInterval(interval)
  //     }
  //   })

  //   useEffect(() => {
  //     console.log(x)
  //   }, [x])

  return (
    <PerspectiveCamera
      makeDefault
      key={undefined}
      attach={undefined}
      attachArray={undefined}
      attachObject={undefined}
      args={undefined}
      onUpdate={undefined}
      visible={undefined}
      type={undefined}
      id={undefined}
      uuid={undefined}
      name={undefined}
      parent={undefined}
      modelViewMatrix={undefined}
      normalMatrix={undefined}
      matrixWorld={undefined}
      matrixAutoUpdate={undefined}
      matrixWorldNeedsUpdate={undefined}
      castShadow={undefined}
      receiveShadow={undefined}
      frustumCulled={undefined}
      renderOrder={undefined}
      animations={undefined}
      userData={undefined}
      customDepthMaterial={undefined}
      customDistanceMaterial={undefined}
      isObject3D={undefined}
      onBeforeRender={undefined}
      onAfterRender={undefined}
      applyMatrix4={undefined}
      applyQuaternion={undefined}
      setRotationFromAxisAngle={undefined}
      setRotationFromEuler={undefined}
      setRotationFromMatrix={undefined}
      setRotationFromQuaternion={undefined}
      rotateOnAxis={undefined}
      rotateOnWorldAxis={undefined}
      rotateX={undefined}
      rotateY={undefined}
      rotateZ={undefined}
      translateOnAxis={undefined}
      translateX={undefined}
      translateY={undefined}
      translateZ={undefined}
      localToWorld={undefined}
      worldToLocal={undefined}
      lookAt={undefined}
      add={undefined}
      remove={undefined}
      removeFromParent={undefined}
      clear={undefined}
      getObjectById={undefined}
      getObjectByName={undefined}
      getObjectByProperty={undefined}
      getWorldPosition={undefined}
      getWorldQuaternion={undefined}
      getWorldScale={undefined}
      getWorldDirection={undefined}
      raycast={undefined}
      traverse={undefined}
      traverseVisible={undefined}
      traverseAncestors={undefined}
      updateMatrix={undefined}
      updateMatrixWorld={undefined}
      updateWorldMatrix={undefined}
      toJSON={undefined}
      clone={undefined}
      copy={undefined}
      addEventListener={undefined}
      hasEventListener={undefined}
      removeEventListener={undefined}
      dispatchEvent={undefined}
      zoom={undefined}
      view={undefined}
      focus={undefined}
      near={undefined}
      far={undefined}
      updateProjectionMatrix={undefined}
      setViewOffset={undefined}
      clearViewOffset={undefined}
      matrixWorldInverse={undefined}
      projectionMatrix={undefined}
      projectionMatrixInverse={undefined}
      isCamera={undefined}
      isPerspectiveCamera={undefined}
      fov={undefined}
      aspect={undefined}
      filmGauge={undefined}
      filmOffset={undefined}
      setFocalLength={undefined}
      getFocalLength={undefined}
      getEffectiveFOV={undefined}
      getFilmWidth={undefined}
      getFilmHeight={undefined}
      setLens={undefined}
    />
  )
}

export default Camera
