import { Flex, Box } from '@chakra-ui/layout'
import { Text } from '@chakra-ui/react'
import * as React from 'react'

interface PerformanceStatsProps {
  wordsPerMinute?: React.ReactNode | null
  timer?: React.ReactNode | null
  accuracy?: React.ReactNode | null
}

const PerformanceStats: React.FC<PerformanceStatsProps> = ({ wordsPerMinute, timer, accuracy }) => {
  return (
    <Flex bg="#2c323d" borderRadius="md" p="2rem" align="center" justifyContent="space-between">
      <Box textAlign="center" h="100px" w="100px">
        <Text>WPM</Text>
        {wordsPerMinute}
      </Box>

      <Flex bg="#2c323d" borderRadius="md" h="100px" w="100px" align="center" justify="center">
        <Box textAlign="center">
          <Text fontSize="lg">Time</Text>
          {timer}
        </Box>
      </Flex>

      <Box textAlign="center" h="100px" w="100px">
        <Text>Accuracy</Text>
        {accuracy}
      </Box>
    </Flex>
  )
}

export default PerformanceStats
