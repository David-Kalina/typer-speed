import { Badge, Box, HStack } from '@chakra-ui/react'
import React from 'react'
import { useTime } from '../contexts/TimeContext'

function SetTestTime() {
  const [time, setTime] = useTime()

  return (
    <Box textAlign="center">
      <HStack>
        <Badge
          p="1"
          cursor="pointer"
          onClick={() => setTime(15)}
          fontSize="xs"
          colorScheme={time === 15 ? 'yellow' : 'unset'}
        >
          {15}
        </Badge>
        <Badge
          p="1"
          cursor="pointer"
          onClick={() => setTime(30)}
          fontSize="xs"
          colorScheme={time === 30 ? 'yellow' : 'unset'}
        >
          {30}
        </Badge>
        <Badge
          p="1"
          cursor="pointer"
          onClick={() => setTime(60)}
          fontSize="xs"
          colorScheme={time === 60 ? 'yellow' : 'unset'}
        >
          {60}
        </Badge>
        <Badge
          p="1"
          cursor="pointer"
          onClick={() => setTime(120)}
          fontSize="xs"
          colorScheme={time === 120 ? 'yellow' : 'unset'}
        >
          {120}
        </Badge>
      </HStack>
    </Box>
  )
}

export default SetTestTime
