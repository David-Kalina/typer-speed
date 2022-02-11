import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { newWordsAtom, socketAtom } from '../../store'
import { WordType } from '../../types'
import Word from '../Word/index'

function Index() {
  const [socket] = useAtom(socketAtom)
  const [newWords, setNewWords] = useAtom(newWordsAtom)

  const renderWords = newWords.map(({ className, characters, id }) => {
    return <Word id={id} key={id} className={className} characters={characters} />
  })

  useEffect(() => {
    socket.on('newWord', (newWord: WordType) => {
      setNewWords(prev => [...prev, newWord])
    })
    return () => {
      socket.off('newWord')
    }
  }, [setNewWords, socket])

  return <>{renderWords}</>
}

export default Index
