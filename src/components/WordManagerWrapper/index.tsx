import { Box } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { useRef } from 'react'
import { useResize } from '../../hooks/useResize'
import { useScroll } from '../../hooks/useScroll'
import { caretSettingsAtom } from '../../store/caretAtoms'
import { keyManagerAtom } from '../../store/elementAtoms'
import Caret from '../Caret'

function Index({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [{ delay, color, height, width, opacity }] = useAtom(caretSettingsAtom)
  const [keyManager] = useAtom(keyManagerAtom)
  useScroll(ref)
  useResize(ref)

  const focusKeyManager = () => {
    keyManager?.focus()
  }

  return (
    <Box
      ref={ref}
      borderRadius="md"
      className="word-manager-wrapper"
      position="relative"
      boxSizing="border-box"
      overflow="hidden"
      onClick={focusKeyManager}
      w="100%"
      h="5.0625em"
    >
      <Caret delay={delay} height={height} width={width} opacity={opacity} color={color} />
      {children}
    </Box>
  )
}

Index.displayName = 'WordManagerWrapper'

export default Index
