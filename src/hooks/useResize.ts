import { useUpdateAtom } from 'jotai/utils'
import { useEffect } from 'react'
import { caretCutOffAtom } from '../store/caretAtoms'

export const useResize = (ref: React.RefObject<HTMLDivElement>) => {
  const setCaretCutoff = useUpdateAtom(caretCutOffAtom)

  useEffect(() => {
    const resize = () => {
      window.addEventListener('resize', () => {
        if (ref.current) {
          setCaretCutoff(ref.current.offsetWidth * 0.97)
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
