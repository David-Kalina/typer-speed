import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useRedirect } from '../hooks/useRedirect'
import Login from './Login'
import Register from './Register'
function Auth() {
  const { user } = useAuth()

  useRedirect(user?.email, '/')

  return (
    <Flex
      w="80%"
      flexDir={['column', 'column', 'row']}
      mx="auto"
      h="100%"
      justifyContent="space-between"
    >
      <Register />
      <Login />
    </Flex>
  )
}

export default Auth
