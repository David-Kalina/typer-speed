import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import * as React from 'react'
import { ReactLocation, Router } from 'react-location'
import { routes } from './constants/routes'
import { AuthProvider } from './contexts/AuthContext'
import { socket, SocketContext } from './contexts/SocketContext'
import { TimeProvider } from './contexts/TimeContext'
import './styles.css'

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
          <TimeProvider>
            <Router routes={routes} location={location} />
          </TimeProvider>
        </AuthProvider>
      </SocketContext.Provider>
    </ChakraProvider>
  )
}
