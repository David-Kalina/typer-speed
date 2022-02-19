import { Box, HStack, Text } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { testTimeAtom, themeAtom } from '../store/typingTestAtoms'

function SetTestTime() {
  const [testTime, setTestTime] = useAtom(testTimeAtom)
  const [theme] = useAtom(themeAtom)

  const updateTestTime = (time: number) => {
    setTestTime(time)
  }

  return (
    <Box textAlign="center">
      <HStack>
        <Text
          p="0.5em"
          borderRadius="md"
          cursor="pointer"
          onClick={() => updateTestTime(15)}
          fontSize="lg"
          color={testTime === 15 ? `${theme}.text` : `${theme}.200`}
        >
          {15}
        </Text>
        <Text
          p="0.5em"
          borderRadius="md"
          cursor="pointer"
          onClick={() => updateTestTime(30)}
          fontSize="lg"
          color={testTime === 30 ? `${theme}.text` : `${theme}.200`}
        >
          {30}
        </Text>
        <Text
          p="0.5em"
          borderRadius="md"
          cursor="pointer"
          onClick={() => updateTestTime(60)}
          fontSize="lg"
          color={testTime === 60 ? `${theme}.text` : `${theme}.200`}
        >
          {60}
        </Text>
        <Text
          p="0.5em"
          borderRadius="md"
          cursor="pointer"
          onClick={() => updateTestTime(120)}
          fontSize="lg"
          color={testTime === 120 ? `${theme}.text` : `${theme}.200`}
        >
          {120}
        </Text>
      </HStack>
    </Box>
  )
}

export default SetTestTime
