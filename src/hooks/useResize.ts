import { useUpdateAtom } from 'jotai/utils'
import { useEffect } from 'react'
import { caretCutOffAtom } from '../store'

export const useResize = (ref: React.RefObject<HTMLDivElement>) => {
  const setCaretCutoff = useUpdateAtom(caretCutOffAtom)

  useEffect(() => {
    const resize = () => {
      window.addEventListener('resize', () => {
        if (ref.current) {
          setCaretCutoff(ref.current.offsetWidth * 0.98)
        }
      })
    }

    resize()
    return () => window.removeEventListener('resize', resize)
  }, [ref, setCaretCutoff])

  useEffect(() => {
    if (ref.current) {
      setCaretCutoff(ref.current.offsetWidth * 0.97)
    }
  }, [ref, setCaretCutoff])
}
