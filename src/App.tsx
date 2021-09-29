import { Box, ChakraProvider, theme, VStack } from '@chakra-ui/react'
import * as React from 'react'
import PerformanceStats from './components/PerformanceStats'
import WordsDisplay from './components/WordsDisplay'
import KeyHandler from './components/KeyHandler'
import { socket, SocketContext } from './contexts/SocketContext'

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <SocketContext.Provider value={socket}>
        <Box w="1000px" mx="auto" mt="6rem">
          <VStack spacing={2} align="stretch">
            <PerformanceStats />
            <WordsDisplay />
            <KeyHandler />
          </VStack>
        </Box>
      </SocketContext.Provider>
    </ChakraProvider>
  )
}
