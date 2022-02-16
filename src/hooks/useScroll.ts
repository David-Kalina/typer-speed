import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { caretPositionAtom } from '../store/caretAtoms'
import { useGetElementDimensions } from './useGetElementDimensions'

export const useScroll = (ref: React.RefObject<HTMLDivElement>) => {
  const [{ top }] = useAtom(caretPositionAtom)
  const wordHeight = useGetElementDimensions('.word')

  useEffect(() => {
    const { current } = ref
    if (current && wordHeight && top > wordHeight * 2) {
      current.scrollBy({ top: wordHeight, behavior: 'smooth' })
    }
  }, [ref, top, wordHeight])
}
