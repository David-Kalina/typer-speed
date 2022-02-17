import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { caretPositionAtom } from '../store/caretAtoms'
import { testStartedAtom } from '../store/typingTestAtoms'
import { useGetElementDimensions } from './useGetElementDimensions'

export const useScroll = (ref: React.RefObject<HTMLDivElement>) => {
  const [{ top }] = useAtom(caretPositionAtom)
  const wordHeight = useGetElementDimensions('.word')
  const [testStarted] = useAtom(testStartedAtom)

  useEffect(() => {
    console.log(wordHeight)
    const { current } = ref
    if (current && wordHeight && top > wordHeight * 2) {
      current.scrollBy({ top: wordHeight, behavior: 'smooth' })
    }
    return () => {
      if (!testStarted) current?.scrollTo({ top: 0 })
    }
  }, [ref, top, wordHeight, testStarted])
}
