import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { useEffect } from 'react'
import { caretPositionAtom, characterIndexAtom, currentCharacterAtom, currentWordAtom, socketAtom } from '../store'

export const useNavigateCaret = () => {
  const [currentCharacter, setCurrentCharacter] = useAtom(currentCharacterAtom)
  const [currentWord, setCurrentWord] = useAtom(currentWordAtom)
  const setPosition = useUpdateAtom(caretPositionAtom)
  const [characterIndex] = useAtom(characterIndexAtom)
  const [socket] = useAtom(socketAtom)

  const getNextCharacter = () => {
    if (currentCharacter?.nextElementSibling) {
      return currentCharacter.nextSibling as HTMLDivElement
    }
    return null
  }

  const getCurrentCharacter = () => {
    if (currentCharacter) return currentCharacter
    return null
  }

  const getPrevCharacter = () => {
    if (currentCharacter?.previousElementSibling) return currentCharacter.previousElementSibling as HTMLDivElement
    return null
  }

  const getNextWord = () => {
    if (currentWord?.nextElementSibling) return currentWord.nextElementSibling as HTMLDivElement
    return null
  }

  const moveCaretToNextWord = () => {
    const nextWord = getNextWord()
    setCurrentCharacter(nextWord?.firstChild as HTMLDivElement)
    setCurrentWord(nextWord)
    if (nextWord) {
      setPosition({
        top: nextWord.offsetTop,
        left: nextWord.offsetLeft,
      })
    }
  }

  const moveCaretForward = () => {
    const character = characterIndex > 0 ? getNextCharacter() : getCurrentCharacter()
    setCurrentCharacter(character)
    if (character) {
      return setPosition(prev => ({
        top: prev.top,
        left: prev.left + character.offsetWidth,
      }))
    }
  }

  const moveCaretBackward = () => {
    const prevCharacter = currentCharacter
    setCurrentCharacter(getPrevCharacter())
    if (prevCharacter) {
      console.log('if backward', prevCharacter)
      setPosition(prev => ({
        top: prev.top,
        left: prev.left - prevCharacter?.clientWidth,
      }))
    } else {
      console.log('insane')
    }
  }

  useEffect(() => {
    socket.on('extra', () => {
      if (currentCharacter) {
        return setPosition(prev => ({
          top: prev.top,
          left: prev.left + currentCharacter.offsetWidth,
        }))
      }
    })

    return () => {
      socket.off('extra')
    }
  }, [currentCharacter, setPosition, socket])

  useEffect(() => {
    if (characterIndex <= 0) setCurrentCharacter(currentWord?.firstChild as HTMLDivElement)
  }, [characterIndex, currentWord?.firstChild, setCurrentCharacter])

  return {
    moveCaretForward,
    moveCaretBackward,
    moveCaretToNextWord,
  }
}
