import { Box } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import React, { useEffect, useRef } from 'react'
import { useScroll } from '../../hooks/useScroll'
import { caretCutOffAtom, fontSizeAtom } from '../../store'
import Caret from '../Caret'

function Index({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  const [fontSize] = useAtom(fontSizeAtom)
  const ref = useRef<HTMLDivElement>(null)

  const setCaretCutoff = useUpdateAtom(caretCutOffAtom)

  useScroll(ref)

  useEffect(() => {
    const resize = () => {
      window.addEventListener('resize', () => {
        if (ref.current) {
          setCaretCutoff(ref.current.clientWidth * 0.97)
        }
      })
    }

    resize()
    return () => window.removeEventListener('resize', resize)
  }, [])

  useEffect(() => {
    if (ref.current) {
      setCaretCutoff(ref.current.clientWidth * 0.97)
    }
  }, [])

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
        h="5.0625em"
      >
        <Caret delay={75} />
        {children}
      </Box>
    </>
  )
}

export default Index
