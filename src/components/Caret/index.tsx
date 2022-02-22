import { Box } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { useRef } from 'react'
import { caretPositionAtom } from '../../store/caretAtoms'
import { themeAtom } from '../../store/themeAtoms'
import { testStartedAtom } from '../../store/typingTestAtoms'

export interface CaretProps {
  delay: number
  color: string
  height: number
  width: number
  opacity: number
}

function Index({ delay, color, height, width, opacity }: CaretProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [testStarted] = useAtom(testStartedAtom)
  const [{ top, left }] = useAtom(caretPositionAtom)
  const [theme] = useAtom(themeAtom)

  return (
    <Box
      ref={ref}
      position="absolute"
      h={`${height || 1.3}em`}
      top={`calc(${top}px - 0.2em)`}
      transition={`left ${delay}ms linear`}
      left={`${left}px`}
      borderRadius="md"
      width={`${width || 0.11}em`}
      fontWeight="bold"
      opacity={opacity || 1}
      bg={color || theme.textLight}
      className={testStarted ? 'caret' : 'blink'}
    />
  )
}

Index.displayName = 'Caret'

export default Index
