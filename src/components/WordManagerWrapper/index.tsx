import { Box } from '@chakra-ui/react'
import React from 'react'
import Caret from '../Caret'
import KeyManager from '../KeyManager'

function Index({ children, fontSize }: { children: React.ReactNode | React.ReactNode[]; fontSize: number }) {
  return (
    <Box
      position="relative"
      fontFamily="Roboto Mono, Roboto Mono"
      fontSize={`${fontSize}em`}
      boxSizing="border-box"
      // overflow="hidden"
    >
      <Caret fontSize={fontSize} />
      {children}
      <KeyManager />
    </Box>
  )
}

export default Index
