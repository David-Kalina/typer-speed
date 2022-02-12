import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { forbiddenKeys } from '../../constants/forbiddenKeys'
import {
  caretPositionAtom,
  characterIndexAtom,
  currentCharacterAtom,
  currentWordAtom,
  socketAtom,
  testStartedAtom,
  wordIndexAtom,
} from '../../store'

function Index() {
  const [characterIndex, setCharacterIndex] = useAtom(characterIndexAtom)
  const [, setWordIndex] = useAtom(wordIndexAtom)
  const [socket] = useAtom(socketAtom)
  const [testStarted, setTestStarted] = useAtom(testStartedAtom)
  const [currentCharacter, setCurrentCharacter] = useAtom(currentCharacterAtom)
  const [currentWord, setCurrentWord] = useAtom(currentWordAtom)

  const [position, setPosition] = useAtom(caretPositionAtom)

  const ref = React.useRef<HTMLInputElement>(null)

  const getNextCharacter = () => {
    if (currentCharacter?.nextElementSibling) return currentCharacter.nextSibling as HTMLDivElement
    return null
  }

  const getPrevCharacter = () => {
    if (currentCharacter?.previousElementSibling) return currentCharacter.previousElementSibling as HTMLDivElement
    return currentCharacter
  }

  const getNextWord = () => {
    if (currentWord?.nextElementSibling) return currentWord.nextElementSibling as HTMLDivElement
    return null
  }

  const moveCaretToNextWord = () => {
    const nextWord = getNextWord()
    setCurrentWord(nextWord)
    if (nextWord) {
      setPosition({
        top: nextWord.offsetTop,
        left: nextWord.offsetLeft,
      })
    }
  }

  const moveCaretForward = () => {
    const nextCharacter = getNextCharacter()
    if (nextCharacter) {
      setPosition(prev => ({
        top: prev.top,
        left: prev.left + nextCharacter.clientWidth,
      }))
    }
  }

  const moveCaretBackward = () => {
    const prevCharacter = getPrevCharacter()
    if (prevCharacter)
      setPosition(prev => ({
        top: prev.top,
        left: prev.left - prevCharacter?.clientWidth,
      }))
  }

  useEffect(() => {
    console.log(currentWord)
  }, [currentWord])

  useEffect(() => {
    socket.on('focus', () => {
      ref.current?.focus()
    })
    return () => {
      socket.off('focus')
    }
  }, [socket])

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (forbiddenKeys.includes(e.key)) {
      return e.stopPropagation()
    }

    if (e.code === 'Backspace') {
      if (characterIndex <= 0) return
      socket.emit('backspace')
      getPrevCharacter()
      moveCaretBackward()
      return setCharacterIndex(prev => prev - 1)
    } else if (e.code === 'Space') {
      if (characterIndex > 0) {
        socket.emit('space')
        getNextWord()
        moveCaretToNextWord()
        setCharacterIndex(0)
        setWordIndex(prev => prev + 1)
      }
    } else {
      if (!testStarted) setTestStarted(true)
      socket.emit('key', e.key)
      getNextCharacter()
      moveCaretForward()
      setCharacterIndex(prev => prev + 1)
    }
  }

  return (
    <input
      ref={ref}
      className="key-manager"
      autoFocus
      onKeyDown={e => onKeyDown(e)}
      style={{ height: 0, width: 0, display: 'inline', opacity: 0, position: 'absolute', top: 0, left: 0 }}
    />
  )
}

Index.displayName = 'KeyManager'

export default Index
