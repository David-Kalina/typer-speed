import { useUpdateAtom } from 'jotai/utils'
import { useEffect } from 'react'
import { wordHeightAtom } from '../store'

export const useGetElementDimensions = (ref: React.RefObject<HTMLElement>) => {
  const setWordHeight = useUpdateAtom(wordHeightAtom)

  useEffect(() => {
    if (ref.current) {
      const style = window.getComputedStyle(ref.current)
      const border = parseInt(style.borderTopWidth, 10) + parseInt(style.borderBottomWidth, 10)
      const margin = parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10)
      const padding = parseInt(style.paddingTop, 10) + parseInt(style.paddingBottom, 10)
      setWordHeight(ref.current.clientHeight + border + margin + padding)
    }
  }, [ref, setWordHeight])
}
