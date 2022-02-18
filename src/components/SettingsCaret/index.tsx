import { Box, keyframes } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { themeAtom } from '../../store/typingTestAtoms'

interface IndexProps {
  delay: number
  color: string
  height: number
  width: number
  opacity: number
}

function Index({ delay, color, height, width, opacity }: IndexProps) {
  const [theme] = useAtom(themeAtom)
  return (
    <Box
      h={`${height}em`}
      borderRadius="md"
      width={`${width}px`}
      fontWeight="bold"
      opacity={opacity}
      bg={color || `${theme}.400`}
    />
  )
}

Index.displayName = 'SettingsCaret'

export default Index
