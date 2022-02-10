import React, { useEffect } from 'react'

export const useOnScreen = (ref: React.RefObject<HTMLElement>) => {
  const root = document.querySelector('.word-manager')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (root) {
          if (entry.boundingClientRect.top < root?.getClientRects()[0]?.top) {
            entry.target.remove()
          }
        }
      },
      {
        root,
      }
    )
    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => {
      observer.unobserve(ref.current as any)
    }
  }, [])
}
