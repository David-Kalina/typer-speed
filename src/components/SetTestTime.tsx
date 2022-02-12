import { Box, HStack, Text } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { socketAtom, testTimeAtom } from '../store'

function SetTestTime() {
  const [socket] = useAtom(socketAtom)
  const [testTime, setTestTime] = useAtom(testTimeAtom)

  useEffect(() => {
    socket.emit('testTime', testTime)
  }, [socket, testTime])

  return (
    <Box textAlign="center">
      <HStack>
        <Text
          p="1"
          cursor="pointer"
          onClick={() => setTestTime(15)}
          fontSize="sm"
          color={testTime === 15 ? 'brand.300' : 'brand.200'}
        >
          {15}
        </Text>
        <Text
          p="1"
          cursor="pointer"
          onClick={() => setTestTime(30)}
          fontSize="sm"
          color={testTime === 30 ? 'brand.300' : 'brand.200'}
        >
          {30}
        </Text>
        <Text
          p="1"
          cursor="pointer"
          onClick={() => setTestTime(60)}
          fontSize="sm"
          color={testTime === 60 ? 'brand.300' : 'brand.200'}
        >
          {60}
        </Text>
        <Text
          p="1"
          cursor="pointer"
          onClick={() => setTestTime(120)}
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
