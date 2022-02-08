import { Flex } from '@chakra-ui/react'
import React from 'react'
import Caret from '../Caret'

function Index({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  return (
    <Flex position="relative" overflow="hidden" fontFamily="Roboto Mono, Roboto Mono">
      <Caret />
      {children}
    </Flex>
  )
}

export default Index
