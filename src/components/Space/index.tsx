import { Box } from '@chakra-ui/react'
import { Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useAtom } from 'jotai'
import React, { Suspense } from 'react'
import { cameraAtom } from '../../store/gameAtoms'
import Asteroids from '../Asteroid'
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
        <Track />
        {/* <Physics gravity={[0, 0, 0]}> */}
        <Suspense fallback={null}>
          <Asteroids />
        </Suspense>
        {/* </Physics> */}
        {/* <OrbitControls /> */}
        {/* <FlyControls /> */}
        <Stars />

        <ambientLight intensity={0.5} />
      </Canvas>
      <Box pos="absolute" top={0} left={0} w="100%" h="100%">
        {children}
      </Box>
    </Box>
  )
}

export default Space
