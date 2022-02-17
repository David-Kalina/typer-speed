import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Provider } from 'jotai'
import * as React from 'react'
import { ReactLocation, Router } from 'react-location'
import { routes } from './constants/routes'
import { AuthProvider } from './contexts/AuthContext'
import './styles.css'

const theme = extendTheme({
  colors: {
    mountainHaze: {
      100: '#c3ceda',
      200: '#738FA7',
      300: '#0C4160',
      400: '#071330',
      default: '#738FA7',
      correct: '#1a202c',
      incorrect: '#75172b',
      missed: '#738FA7',
    },
    warmSunset: {
      100: '#FD7F20',
      200: '#FC2E20',
      300: '#FDB750',
      400: '#010100',
      default: '#FDB750',
      correct: '#4d7077',
      incorrect: '#FC2E20',
    },
    morningEspresso: {
      100: '#5C4E4E',
      200: '#988686',
      300: '#D1D0D0',
      400: '#000000',
      default: '#d1d0d0',
      correct: '#5c7b76',
      incorrect: '#ab5465',
      missed: '#d1d0d0',
    },
    crackOfDawn: {
      100: '#001F3D',
      200: '#045174',
      300: '#D89C60',
      400: '#E87A00',
      default: '#E87A00',
      correct: '#fbbb7c',
      incorrect: '#d55757',
      missed: '#E87A00',
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
