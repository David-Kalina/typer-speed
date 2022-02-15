// import { useAtom } from 'jotai'
import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { useEffect } from 'react'
import { currentWordElementAtom, currentCharacterElementAtom, caretElementAtom, caretPositionAtom } from '../store'

export const useMountCaret = (ref: React.RefObject<HTMLDivElement>) => {
  const setCurrentWord = useUpdateAtom(currentWordElementAtom)
  const setCurrentCharacter = useUpdateAtom(currentCharacterElementAtom)
  const setCaret = useUpdateAtom(caretElementAtom)
  const setCaretPosition = useUpdateAtom(caretPositionAtom)
  // const [words] = useAtom(wordsAtom)
  useEffect(() => {
    const { current: caret } = ref
    const nextWord = caret?.nextElementSibling?.firstElementChild?.nextElementSibling as HTMLDivElement
    const currentCharacter = caret?.nextElementSibling?.firstElementChild?.firstElementChild as HTMLDivElement
    if (caret && nextWord && currentCharacter) {
      setCaret(caret)
      setCurrentWord(nextWord)
      setCurrentCharacter(currentCharacter as HTMLDivElement)
      return setCaretPosition({
        top: currentCharacter.offsetTop,
        left: currentCharacter.offsetLeft,
      })
    }
  }, [ref, setCaret, setCaretPosition, setCurrentCharacter, setCurrentWord])
}
