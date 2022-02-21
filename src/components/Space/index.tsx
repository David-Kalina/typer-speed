import { Box } from '@chakra-ui/react'
import { Physics } from '@react-three/cannon'
import { OrbitControls, Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useAtom } from 'jotai'
import React, { Suspense } from 'react'
import { cameraAtom } from '../../store/gameAtoms'
import Model from '../Asteroid'
import Planet from '../Planet'
import Track from '../Track'

// function Asteroid() {
//   return (
//     <mesh
//   )
// }

function Space({ children }: { children?: React.ReactNode | React.ReactNode[] }) {
  const [camera] = useAtom(cameraAtom)

  return (
    <Box bg="black" position="fixed" top={0} left={0} width="100vw" height="100vh" overflow="hidden">
      <Canvas camera={camera}>
        <OrbitControls />
        <Track />
        <Physics gravity={[0, 0, 0]}>
          <Suspense fallback={null}>
            <Model position={[0, 0, -1]} rotation={[0, 0, 0]} />
          </Suspense>
          <Suspense fallback={null}>
            <Model position={[0, 0, -2]} rotation={[0, 0, 0]} />
          </Suspense>
          <Suspense fallback={null}>
            <Model position={[0, 0, -3]} rotation={[0, 0, 0]} />
          </Suspense>
          <Suspense fallback={null}>
            <Planet position={[0, 0, 0]} />
          </Suspense>
        </Physics>
        <Stars />

        <ambientLight intensity={0.5} />
      </Canvas>
      <Box color="red" pos="absolute" top={0} left={0} w="100%" h="100%">
        {children}
      </Box>
    </Box>
  )
}

export default Space
