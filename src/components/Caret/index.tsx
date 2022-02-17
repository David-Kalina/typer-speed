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
      h="1.15em"
      top={`${top - 2}px `}
      transition={`left ${delay}ms linear`}
      left={`${left - 2}px`}
      borderRadius="sm"
      width="0.1em"
      fontWeight="bold"
      bg={`${theme}.400`}
      className={testStarted ? 'caret' : 'blink'}
    />
  )
}

Index.displayName = 'Caret'

export default Index
