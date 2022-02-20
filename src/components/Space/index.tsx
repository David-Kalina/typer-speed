import { Box } from '@chakra-ui/react'
import { OrbitControls, Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'

function Space({ children }: { children: React.ReactNode }) {
  return (
    <Box h="100vh" bg="black" position="relative" overflow="hidden">
      <Canvas>
        <Stars />
        <OrbitControls autoRotate autoRotateSpeed={0.3} />
      </Canvas>
      <Box color="red" pos="absolute" top={0} left={0} w="100%" h="100%">
        {children}
      </Box>
    </Box>
  )
}

export default Space
