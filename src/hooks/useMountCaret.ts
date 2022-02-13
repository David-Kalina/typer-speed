import { useUpdateAtom } from 'jotai/utils'
import { useEffect } from 'react'
import { currentWordAtom, currentCharacterAtom } from '../store'

export const useMountCaret = (ref: React.RefObject<HTMLDivElement>) => {
  const setCurrentWord = useUpdateAtom(currentWordAtom)
  const setCurrentCharacter = useUpdateAtom(currentCharacterAtom)
  useEffect(() => {
    const { current: caret } = ref
    if (caret) {
      const currentWord = caret?.nextElementSibling?.firstElementChild as HTMLDivElement
      const currentCharacter = caret?.nextElementSibling?.firstElementChild?.firstElementChild as HTMLDivElement
      setCurrentWord(currentWord)
      setCurrentCharacter(currentCharacter as HTMLDivElement)
    }
  }, [ref, setCurrentCharacter, setCurrentWord])
}
