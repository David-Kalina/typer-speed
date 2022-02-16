import { Box } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { useRef } from 'react'
import { useResize } from '../../hooks/useResize'
import { useScroll } from '../../hooks/useScroll'
import { fontSizeAtom } from '../../store/typingTestAtoms'
import Caret from '../Caret'

function Index({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  const [fontSize] = useAtom(fontSizeAtom)
  const ref = useRef<HTMLDivElement>(null)
  useScroll(ref)
  useResize(ref)

  return (
    <Box
      ref={ref}
      fontFamily="Roboto Mono"
      className="word-manager-wrapper"
      position="relative"
      fontSize={`${fontSize}vw`}
      boxSizing="border-box"
      overflow="hidden"
      w="100%"
      h="5.0625em"
    >
      <Caret delay={60} />
      {children}
    </Box>
  )
}

Index.displayName = 'WordManagerWrapper'

export default Index
