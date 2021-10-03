import { Box, ChakraProvider, theme, VStack } from '@chakra-ui/react'
import * as React from 'react'
import KeyHandler from './components/KeyHandler'
import NewTest from './components/NewTest'
import PerformanceStats from './components/PerformanceStats'
import Timer from './components/Timer'
import WordsDisplay from './components/WordsDisplay'
import { socket, SocketContext } from './contexts/SocketContext'

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <SocketContext.Provider value={socket}>
        <Box w="1000px" mx="auto" mt="6rem">
          <VStack spacing={2} align="stretch">
            <PerformanceStats timer={<Timer />} />
            <WordsDisplay />
            <KeyHandler />
            <NewTest />
          </VStack>
        </Box>
      </SocketContext.Provider>
    </ChakraProvider>
  )
}
