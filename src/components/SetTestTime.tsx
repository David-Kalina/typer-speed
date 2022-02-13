import { Box, HStack, Text } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { useResetTypingTest } from '../hooks/useResetTypingTest'
import { testTimeAtom } from '../store'

function SetTestTime() {
  const [testTime, setTestTime] = useAtom(testTimeAtom)
  const reset = useResetTypingTest()

  const updateTestTime = (time: number) => {
    setTestTime(time)
    reset()
  }

  return (
    <Box textAlign="center">
      <HStack>
        <Text
          p="1"
          cursor="pointer"
          onClick={() => updateTestTime(15)}
          fontSize="sm"
          color={testTime === 15 ? 'brand.300' : 'brand.200'}
        >
          {15}
        </Text>
        <Text
          p="1"
          cursor="pointer"
          onClick={() => updateTestTime(30)}
          fontSize="sm"
          color={testTime === 30 ? 'brand.300' : 'brand.200'}
        >
          {30}
        </Text>
        <Text
          p="1"
          cursor="pointer"
          onClick={() => updateTestTime(60)}
          fontSize="sm"
          color={testTime === 60 ? 'brand.300' : 'brand.200'}
        >
          {60}
        </Text>
        <Text
          p="1"
          cursor="pointer"
          onClick={() => updateTestTime(120)}
          fontSize="sm"
          color={testTime === 120 ? 'brand.300' : 'brand.200'}
        >
          {120}
        </Text>
      </HStack>
    </Box>
  )
}

export default SetTestTime
