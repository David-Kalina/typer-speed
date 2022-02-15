import { useAtom } from 'jotai'
import React from 'react'
import { newWordsAtom } from '../../store'
import Word from '../Word/index'

function Index() {
  const [newWords, setNewWords] = useAtom(newWordsAtom)

  const renderWords = newWords.map(({ className, characters, id }) => {
    return <Word id={id} key={id} className={className} characters={characters} />
  })

  return <>{renderWords}</>
}

Index.displayName = 'NewWordsManager'

export default Index
