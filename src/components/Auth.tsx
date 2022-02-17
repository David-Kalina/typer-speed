import { Stack } from '@chakra-ui/react'
import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useRedirect } from '../hooks/useRedirect'
import Login from './Login'
import Register from './Register'
function Auth() {
  const { user } = useAuth()

  useRedirect(user?.email, '/')

  return (
    <Stack
      spacing={10}
      w="80%"
      direction={['column', 'column', 'row', 'row']}
      mx="auto"
      h="100%"
      align={['center', 'center', 'center', 'center']}
      justifyContent={['center', 'center', 'space-between', 'space-between']}
    >
      <Register />
      <Login />
    </Stack>
  )
}

export default Auth
