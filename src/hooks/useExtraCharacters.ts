import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { useEffect, useState } from 'react'
import { currentWordAtom, socketAtom } from '../store'
import { Character as CharacterType } from '../types'

export const useExtraCharacters = (id: number) => {
  const [socket] = useAtom(socketAtom)
  const [extraCharacters, setExtraCharacters] = useState<CharacterType[]>([])
 
  useEffect(() => {
    socket.on(`extra-${id}`, (characters: CharacterType[]) => {
      setExtraCharacters(characters)
    })
    return () => {
      socket.off(`extra-${id}`)
    }
  }, [extraCharacters, id, socket])

  return extraCharacters
}
