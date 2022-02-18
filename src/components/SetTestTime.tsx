import { Box, HStack, Text } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { resetTypingTestAtom, testTimeAtom, themeAtom } from '../store/typingTestAtoms'

function SetTestTime() {
  const [testTime, setTestTime] = useAtom(testTimeAtom)
  const [theme] = useAtom(themeAtom)
  const [, reset] = useAtom(resetTypingTestAtom)

  const updateTestTime = (time: number) => {
    setTestTime(time)
    reset()
  }

  return (
    <Box textAlign="center">
      <HStack>
        <Text
          p="0.5em"
          borderRadius="md"
          cursor="pointer"
          onClick={() => updateTestTime(15)}
          fontSize="sm"
          bg={testTime === 15 ? `${theme}.200` : `${theme}.100`}
        >
          {15}
        </Text>
        <Text
          p="0.5em"
          borderRadius="md"
          cursor="pointer"
          onClick={() => updateTestTime(30)}
          fontSize="sm"
          bg={testTime === 30 ? `${theme}.200` : `${theme}.100`}
        >
          {30}
        </Text>
        <Text
          p="0.5em"
          borderRadius="md"
          cursor="pointer"
          onClick={() => updateTestTime(60)}
          fontSize="sm"
          bg={testTime === 60 ? `${theme}.200` : `${theme}.100`}
        >
          {60}
        </Text>
        <Text
          p="0.5em"
          borderRadius="md"
          cursor="pointer"
          onClick={() => updateTestTime(120)}
          fontSize="sm"
          bg={testTime === 120 ? `${theme}.200` : `${theme}.100`}
        >
          {120}
        </Text>
      </HStack>
    </Box>
  )
}

export default SetTestTime
