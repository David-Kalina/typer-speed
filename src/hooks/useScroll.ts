import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { wordHeightAtom, wordOffsetAtom } from '../store'

export const useScroll = (ref: React.RefObject<HTMLDivElement>) => {
  const [scrollByHeight] = useAtom(wordHeightAtom)
  const [{ top }] = useAtom(wordOffsetAtom)
  const [wordHeight] = useAtom(wordHeightAtom)

  useEffect(() => {
    const { current } = ref
    if (current && top > wordHeight * 2) {
      current.scrollBy({ top: scrollByHeight, behavior: 'smooth' })
    }
  }, [ref, scrollByHeight, top, wordHeight])
}
