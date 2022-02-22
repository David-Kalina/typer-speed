import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'jotai'
import * as React from 'react'
import { ReactLocation, Router } from 'react-location'
import { routes } from './pages/routes'
import { AuthProvider } from './contexts/AuthContext'
import './styles.css'

const location = new ReactLocation()

export const App = () => {
  return (
    <ChakraProvider>
      <Provider>
        <AuthProvider>
          <Router routes={routes} location={location} />
        </AuthProvider>
      </Provider>
    </ChakraProvider>
  )
}
