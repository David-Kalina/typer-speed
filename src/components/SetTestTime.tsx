import { Box, HStack, Text, Tooltip } from '@chakra-ui/react'
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
        <Tooltip label={`15 seconds`}>
          <Text
            p="0.5em"
            borderRadius="md"
            cursor="pointer"
            onClick={() => updateTestTime(15)}
            fontSize="lg"
            color={testTime === 15 ? theme.correct : theme.default}
          >
            {15}
          </Text>
        </Tooltip>
        <Tooltip label={`30 seconds`}>
          <Text
            p="0.5em"
            borderRadius="md"
            cursor="pointer"
            onClick={() => updateTestTime(30)}
            fontSize="lg"
            color={testTime === 30 ? theme.correct : theme.default}
          >
            {30}
          </Text>
        </Tooltip>
        <Tooltip label={`60 seconds`}>
          <Text
            p="0.5em"
            borderRadius="md"
            cursor="pointer"
            onClick={() => updateTestTime(60)}
            fontSize="lg"
            color={testTime === 60 ? theme.correct : theme.default}
          >
            {60}
          </Text>
        </Tooltip>
        <Tooltip label={`120 seconds`}>
          <Text
            p="0.5em"
            borderRadius="md"
            cursor="pointer"
            onClick={() => updateTestTime(120)}
            fontSize="lg"
            color={testTime === 120 ? theme.correct : theme.default}
          >
            {120}
          </Text>
        </Tooltip>
      </HStack>
    </Box>
  )
}

export default SetTestTime
