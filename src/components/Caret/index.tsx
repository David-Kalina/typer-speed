import { Box } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import React, { useEffect } from 'react'
import { useCaretPosition } from '../../hooks/useCaretPosition'
import { caretPositionAtom, currentCharacterAtom, currentWordAtom, testStartedAtom } from '../../store'

function Index({ delay }: { delay: number }) {
  const [testStarted] = useAtom(testStartedAtom)
  const ref = React.useRef<HTMLDivElement>(null)
  const setCurrentWord = useUpdateAtom(currentWordAtom)
  const setCurrentCharacter = useUpdateAtom(currentCharacterAtom)
  const [{ top, left }] = useAtom(caretPositionAtom)

  // const { top, left } = useCaretPosition()

  useEffect(() => {
    const caret = document.querySelector('.blink')
    if (caret) {
      const currentWord = caret?.nextElementSibling?.firstElementChild as HTMLDivElement
      const currentCharacter = caret?.nextElementSibling?.firstElementChild?.firstElementChild as HTMLDivElement
      setCurrentWord(currentWord)
      setCurrentCharacter(currentCharacter as HTMLDivElement)
    }
  }, [])

  return (
    <Box
      ref={ref}
      position="absolute"
      h="1.25em"
      top={`${top - 4}px `}
      transition={`left ${delay}ms linear`}
      left={`${testStarted ? left + 3 : 4}px`}
      borderRadius="md"
      width="0.14em"
      fontWeight="bold"
      bg="brand.200"
      className={testStarted ? 'caret' : 'blink'}
    />
  )
}

Index.displayName = 'Caret'

export default Index
