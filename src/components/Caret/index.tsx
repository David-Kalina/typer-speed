import { Box } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { useRef } from 'react'
import { caretPositionAtom } from '../../store/caretAtoms'
import { testStartedAtom, themeAtom } from '../../store/typingTestAtoms'

function Index({ delay }: { delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [testStarted] = useAtom(testStartedAtom)
  const [{ top, left }] = useAtom(caretPositionAtom)
  const [theme] = useAtom(themeAtom)

  return (
    <Box
      ref={ref}
      position="absolute"
      h="1.3em"
      top={`calc(${top}px - 0.2em)`}
      transition={`left ${delay}ms linear`}
      left={`${left}px`}
      borderRadius="md"
      width="0.11em"
      fontWeight="bold"
      bg={`${theme}.400`}
      className={testStarted ? 'caret' : 'blink'}
    />
  )
}

Index.displayName = 'Caret'

export default Index
