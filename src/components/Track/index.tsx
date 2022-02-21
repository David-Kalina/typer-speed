import { useFrame } from '@react-three/fiber'
import { useAtom } from 'jotai'
import React from 'react'
import * as THREE from 'three'
import { cameraAtom, clockAtom, trackAtom, updateCameraAtom } from '../../store/gameAtoms'

function Track() {
  const [track] = useAtom(trackAtom)
  const [, updateCamera] = useAtom(updateCameraAtom)

  useFrame(() => {
    updateCamera()
  })

  return (
    <mesh scale={[1, 1, 1]} geometry={track}>
      <meshBasicMaterial color="white" side={THREE.DoubleSide} wireframe />
    </mesh>
  )
}

export default Track
