import { Box } from '@chakra-ui/react'
import React from 'react'
import { CaretProps } from '../Caret'

function Index({ color, height, width, opacity }: CaretProps) {
  return (
    <Box
      scale={3}
      h={`${height * 4}em`}
      borderRadius="md"
      width={`${width * 4}em`}
      fontWeight="bold"
      opacity={opacity}
      bg={color}
    />
  )
}

Index.displayName = 'SettingsCaret'

export default Index
