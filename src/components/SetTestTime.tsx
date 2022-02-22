import { Box, HStack, Text } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { themeAtom } from '../store/themeAtoms'
import { testTimeAtom } from '../store/typingTestAtoms'

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
          color={testTime === 15 ? theme.textLight : theme.textDark}
        >
          {15}
        </Text>
        <Text
          p="0.5em"
          borderRadius="md"
          cursor="pointer"
          onClick={() => updateTestTime(30)}
          fontSize="lg"
          color={testTime === 30 ? theme.textLight : theme.textDark}
        >
          {30}
        </Text>
        <Text
          p="0.5em"
          borderRadius="md"
          cursor="pointer"
          onClick={() => updateTestTime(60)}
          fontSize="lg"
          color={testTime === 60 ? theme.textLight : theme.textDark}
        >
          {60}
        </Text>
        <Text
          p="0.5em"
          borderRadius="md"
          cursor="pointer"
          onClick={() => updateTestTime(120)}
          fontSize="lg"
          color={testTime === 120 ? theme.textLight : theme.textDark}
        >
          {120}
        </Text>
      </HStack>
    </Box>
  )
}

export default SetTestTime
