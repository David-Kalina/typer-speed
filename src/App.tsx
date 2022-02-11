import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Provider } from 'jotai'
import * as React from 'react'
import { ReactLocation, Router } from 'react-location'
import { routes } from './constants/routes'
import { AuthProvider } from './contexts/AuthContext'
import './styles.css'

const theme = extendTheme({
  colors: {
    brand: {
      100: '#000000',
      200: '#EF767A',
      300: '#F7F7FF',
      400: '#23B5D3',
    },
  },
})

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
