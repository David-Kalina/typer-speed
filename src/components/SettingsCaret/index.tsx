import { Box } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { themeAtom } from '../../store/themeAtoms'
import { CaretProps } from '../Caret'

function Index({ color, height, width, opacity }: CaretProps) {
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
