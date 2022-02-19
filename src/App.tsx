import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Provider } from 'jotai'
import * as React from 'react'
import { ReactLocation, Router } from 'react-location'
import { routes } from './constants/routes'
import { themes } from './constants/themes'
import { AuthProvider } from './contexts/AuthContext'
import './styles.css'

const theme = extendTheme({
  colors: {
    ...themes,
  },
})

const location = new ReactLocation()

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Provider>
        <AuthProvider>
          <Router routes={routes} location={location} />
        </AuthProvider>
      </Provider>
    </ChakraProvider>
  )
}
