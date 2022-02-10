import { Box } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { useRef } from 'react'
import { useResize } from '../../hooks/useResize'
import { useScroll } from '../../hooks/useScroll'
import { fontSizeAtom } from '../../store'
import Caret from '../Caret'

function Index({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  const [fontSize] = useAtom(fontSizeAtom)
  const ref = useRef<HTMLDivElement>(null)
  useScroll(ref)
  useResize(ref)

  return (
    <>
      <Box
        ref={ref}
        className="word-manager-wrapper"
        position="relative"
        fontFamily="Roboto Mono, Roboto Mono"
        fontSize={`${fontSize}em`}
        boxSizing="border-box"
        overflow="hidden"
        h="9.5625rem"
      >
        <Caret delay={75} />
        {children}
      </Box>
    </>
  )
}

export default Index
