import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Provider } from 'jotai'
import * as React from 'react'
import { ReactLocation, Router } from 'react-location'
import { routes } from './constants/routes'
import { AuthProvider } from './contexts/AuthContext'
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
      <AuthProvider>
        <Provider>
          <Router routes={routes} location={location} />
        </Provider>
      </AuthProvider>
    </ChakraProvider>
  )
}
