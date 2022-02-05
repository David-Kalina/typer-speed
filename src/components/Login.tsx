import { Button, Flex, IconButton, Input, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { IoLogoGoogle } from 'react-icons/io'
import { SignInData, useAuth } from '../contexts/AuthContext'
function Login() {
  const { signIn, signInWithGoogle } = useAuth()
  const { register, handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit(data => signIn(data as SignInData))}>
      <VStack spacing={2} justify="space-evenly" align="stretch" h="300px">
        <Flex align="center" justify="space-between">
          <Text fontSize="sm">login</Text>
          <Text fontSize="sm">forgot password?</Text>
        </Flex>
        <Input {...register('email')} type="email" placeholder="email" />
        <Input
          {...register('password')}
          type="password"
          placeholder="password"
        />
        <Button type="submit">login</Button>
        <Text textAlign="center">or</Text>
        <IconButton
          onClick={signInWithGoogle}
          aria-label="google sign in method"
          icon={<IoLogoGoogle />}
        ></IconButton>
      </VStack>
    </form>
  )
}

export default Login
