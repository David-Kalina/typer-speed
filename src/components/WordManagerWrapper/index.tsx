import { Box } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { useResize } from '../../hooks/useResize'
import { useScroll } from '../../hooks/useScroll'
import Caret from '../Caret'

function Index({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  const ref = useRef<HTMLDivElement>(null)
  useScroll(ref)
  useResize(ref)

  return (
    <Box
      ref={ref}
      borderRadius="md"
      fontFamily="Roboto Mono"
      className="word-manager-wrapper"
      position="relative"
      boxSizing="border-box"
      overflow="hidden"
      w="100%"
      h="5.0625em"
    >
      <Caret delay={90} />
      {children}
    </Box>
  )
}

Index.displayName = 'WordManagerWrapper'

export default Index
