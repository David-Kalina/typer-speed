import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { socketAtom } from '../store'
import { WordType } from '../types'

export const useWords = () => {
  const [socket] = useAtom(socketAtom)
  const [words, setWords] = useState<WordType[]>([])

  useEffect(() => {
    socket.on('words', (words: WordType[]) => {
      setWords(words)
    })

    return () => {
      socket.off('words')
    }
  }, [socket, setWords])

  return words
}
