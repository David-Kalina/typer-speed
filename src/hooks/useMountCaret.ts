// import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { useEffect } from 'react'
import { caretElementAtom, caretPositionAtom, currentCharacterElementAtom, currentWordElementAtom } from '../store'

export const useMountCaret = (ref: React.RefObject<HTMLDivElement>) => {
  const setCurrentWord = useUpdateAtom(currentWordElementAtom)
  const setCurrentCharacter = useUpdateAtom(currentCharacterElementAtom)
  const setCaret = useUpdateAtom(caretElementAtom)
  const setCaretPosition = useUpdateAtom(caretPositionAtom)
  // const [words] = useAtom(wordsAtom)
  useEffect(() => {
    const { current: caret } = ref
    const currentWord = caret?.nextElementSibling?.firstElementChild as HTMLDivElement
    const currentCharacter = caret?.nextElementSibling?.firstElementChild?.firstElementChild as HTMLDivElement
    if (caret && currentWord && currentCharacter) {
      setCaret(caret)
      setCurrentWord(currentWord)
      setCurrentCharacter(currentCharacter as HTMLDivElement)
      return setCaretPosition({
        top: currentCharacter.offsetTop,
        left: currentCharacter.offsetLeft,
      })
    }
  }, [ref, setCaret, setCaretPosition, setCurrentCharacter, setCurrentWord])
}
