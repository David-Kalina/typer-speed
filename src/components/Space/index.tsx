import { Box } from '@chakra-ui/react'
import { Physics } from '@react-three/cannon'
import { Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useAtom } from 'jotai'
import React, { Suspense } from 'react'
import { cameraAtom } from '../../store/gameAtoms'
import Asteroids from '../Asteroid'
import Planet from '../Planet'
import RingedPlanet from '../RingedPlanet'
import Track from '../Track'

function Space({ children }: { children?: React.ReactNode | React.ReactNode[] }) {
  const [camera] = useAtom(cameraAtom)

  return (
    <Box bg="black" position="fixed" top={0} left={0} width="100vw" height="100vh" overflow="hidden">
      <Canvas camera={camera} dpr={window.devicePixelRatio}>
        <Track />
        <Physics gravity={[0, 0, 0]}>
          <Suspense fallback={null}>
            <Asteroids />
            <RingedPlanet />
          </Suspense>
          <Planet />
        </Physics>
        {/* <OrbitControls /> */}

        <ambientLight intensity={0.5} />
        <Stars radius={1200} count={20000} depth={-800} />
      </Canvas>
      <Box pos="absolute" top={0} left={0} w="100%" h="100%">
        {children}
      </Box>
    </Box>
  )
}

export default Space
