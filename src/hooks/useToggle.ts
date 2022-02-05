import { useState } from 'react'

export const useToggle = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue)

  const toggle = (value: boolean) => setValue(value)

  return [value, toggle] as const
}
