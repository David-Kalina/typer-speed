import { useUpdateAtom } from 'jotai/utils'
import { useEffect } from 'react'
import { caretCutOffAtom } from '../store'

export const useResize = (ref: React.RefObject<HTMLDivElement>) => {
  const setCaretCutoff = useUpdateAtom(caretCutOffAtom)

  useEffect(() => {
    const resize = () => {
      window.addEventListener('resize', () => {
        if (ref.current) {
          setCaretCutoff(ref.current.clientWidth * 0.97)
        }
      })
    }

    resize()
    return () => window.removeEventListener('resize', resize)
  }, [])

  useEffect(() => {
    if (ref.current) {
      setCaretCutoff(ref.current.clientWidth * 0.97)
    }
  }, [])
}
