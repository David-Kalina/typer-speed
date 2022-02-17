import { useEffect, useState } from 'react'

export const useGetElementDimensions = (className: string) => {
  const [wordHeight, setWordHeight] = useState(0)

  const element = document.querySelector(className)

  useEffect(() => {
    if (element) {
      const style = window.getComputedStyle(element)
      const border = parseInt(style.borderTopWidth, 10) + parseInt(style.borderBottomWidth, 10)
      const margin = parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10)
      const padding = parseInt(style.paddingTop, 10) + parseInt(style.paddingBottom, 10)
      setWordHeight(element.clientHeight + border + margin + padding)
    }

    return () => {
      setWordHeight(0)
    }
  }, [element, setWordHeight])

  return wordHeight
}
