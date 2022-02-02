import React from 'react'
import { Text } from '@chakra-ui/react'

interface WordProps {
  text: string
  idx: number
  style: {
    color: string
    bg: string
    animation: string | undefined
  }
}

function Word({ text, idx, style }: WordProps) {
  return (
    <Text
      key={idx}
      borderRadius="sm"
      p="0.2rem"
      bg={style?.bg}
      animation={style?.animation}
      color={style?.color}
      h="min-content"
      mx="0.1rem"
      my="0.1rem"
      w="max-content"
    >
      {text}
    </Text>
  )
}

export default Word
