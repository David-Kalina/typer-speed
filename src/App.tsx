import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import * as React from 'react'
import { Router, ReactLocation } from 'react-location'
import { socket, SocketContext } from './contexts/SocketContext'
import { useEmitSocketEvent } from './hooks/useSocketEvent'
import { routes } from './constants/routes'
import { AuthProvider } from './contexts/AuthContext'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}
const theme = extendTheme({ config } as any)

const location = new ReactLocation()

export const App = () => {

  return (
    <ChakraProvider theme={theme}>
      <SocketContext.Provider value={socket}>
        <AuthProvider>
          <Router routes={routes} location={location} />
        </AuthProvider>
      </SocketContext.Provider>
    </ChakraProvider>
  )
}
