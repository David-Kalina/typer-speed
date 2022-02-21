import { useSphere } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect, useState } from 'react'

interface AsteroidProps {
  key: number
  x: number
  y: number
  z: number
}

function Asteroid({ x, y, z }: AsteroidProps) {
  // const [model, setModel] = useState<any>()

  const [ref] = useSphere(() => ({
    mass: 1,
    position: [x, y, z],
    angularVelocity: [Math.random() * 0.1 - 0.05, Math.random() * 0.1 - 0.05, Math.random() * 0.1 - 0.05],
  }))

  const model = useGLTF('/asteroid/scene.gltf')

  return model ? (
    <mesh ref={ref} scale={1}>
      <primitive object={model.scene} />
    </mesh>
  ) : null
}

export default Asteroid
