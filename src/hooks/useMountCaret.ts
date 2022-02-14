// import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { useEffect } from 'react'
import { currentWordElementAtom, currentCharacterElementAtom } from '../store'

export const useMountCaret = (ref: React.RefObject<HTMLDivElement>) => {
  const setCurrentWord = useUpdateAtom(currentWordElementAtom)
  const setCurrentCharacter = useUpdateAtom(currentCharacterElementAtom)
  // const [words] = useAtom(wordsAtom)
  useEffect(() => {
    const { current: caret } = ref
    if (caret) {
      const nextWord = caret?.nextElementSibling?.firstElementChild?.nextElementSibling as HTMLDivElement
      const currentCharacter = caret?.nextElementSibling?.firstElementChild?.firstElementChild as HTMLDivElement
      setCurrentWord(nextWord)
      setCurrentCharacter(currentCharacter as HTMLDivElement)
    }
  }, [ref, setCurrentCharacter, setCurrentWord])
}
