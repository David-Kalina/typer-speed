import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { wordHeightAtom, wordOffsetAtom } from '../store'

export const useScroll = (ref: React.RefObject<HTMLDivElement>) => {
  const [count, setCount] = useState(0)
  const [scrollByHeight] = useAtom(wordHeightAtom)
  const [{ top }] = useAtom(wordOffsetAtom)

  useEffect(() => {
    setCount(count + 1)
    const { current } = ref

    if (current && count > 2) {
      current.scrollBy({ top: scrollByHeight, behavior: 'smooth' })
    }
  }, [top])
}
