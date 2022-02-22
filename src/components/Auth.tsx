import { Stack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useRedirect } from '../hooks/useRedirect'
import { themeAtom } from '../store/themeAtoms'
import Login from './Login'
import Register from './Register'
function Auth() {
  const { user } = useAuth()

  useRedirect(user?.email, '/')

  const [theme] = useAtom(themeAtom)

  return (
    <Stack
      spacing={10}
      w="80%"
      direction={['column', 'column', 'row', 'row']}
      mx="auto"
      h="100%"
      color={theme.textLight}
      align="center"
      justifyContent={['center', 'center', 'space-between', 'space-between']}
    >
      <Register />
      <Login />
    </Stack>
  )
}

export default Auth
