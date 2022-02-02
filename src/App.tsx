import { Box, ChakraProvider, extendTheme, Flex } from '@chakra-ui/react'
import * as React from 'react'
import KeyHandler from './components/KeyHandler'
import NewTest from './components/NewTest'
import StatChart from './components/StatChart'
import WordsDisplay from './components/WordsDisplay'
import { socket, SocketContext } from './contexts/SocketContext'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}
// 3. extend the theme
const theme = extendTheme({ config } as any)

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <SocketContext.Provider value={socket}>
        <Flex
          align={['start', 'start', 'center']}
          justify="center"
          h="100vh"
          w="100vw"
          overflow="hidden"
        >
          <Box w={['100%', '100%', '1000px']} mx="auto" p={[2, 2, 2, 0]}>
            {/* <PerformanceStats
                timer={<Timer />}
                wordsPerMinute={<WordsPerMinute />}
                accuracy={<Accuracy />}
              /> */}
            <WordsDisplay />
            <KeyHandler />
            <Flex>
              <NewTest />
            </Flex>
          </Box>
        </Flex>
        <StatChart />
      </SocketContext.Provider>
    </ChakraProvider>
  )
}
