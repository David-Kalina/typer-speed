import { Box, ChakraProvider, extendTheme, Flex, HStack, Link, Text } from '@chakra-ui/react'
import * as React from 'react'
import { VscGithub } from 'react-icons/vsc'
import { CgWebsite } from 'react-icons/cg'
import { GiSpeedometer } from 'react-icons/gi'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import KeyHandler from './components/KeyHandler'
import NewTest from './components/NewTest'
import StatChart from './components/StatChart'
import WordsDisplay from './components/WordsDisplay'
import { socket, SocketContext } from './contexts/SocketContext'
import Footer from './components/Footer'
import Header from './components/Header'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}
const theme = extendTheme({ config } as any)

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <SocketContext.Provider value={socket}>
        <Flex
          mx="auto"
          justify={['start', 'start', 'space-between', 'space-between']}
          align="center"
          h="100vh"
          flexDir="column"
          overflow="hidden"
          w={['100%', '100%', '1000px']}
        >
          <Header />

          <Box
            mx="auto"
            p={[2, 2, 2, 0]}
            h={['100%', '100%', 'unset']}
            overflow="hidden"
            mb={['auto', 'auto', 'unset']}
          >
            <WordsDisplay />
            <KeyHandler />
            <Flex>
              <NewTest />
            </Flex>
          </Box>

          <Footer />
        </Flex>
        <StatChart />
      </SocketContext.Provider>
    </ChakraProvider>
  )
}
