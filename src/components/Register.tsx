import { Button, Input, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { SignUpData, useAuth } from '../contexts/AuthContext'

function Register() {
  const { signUp } = useAuth()
  const { handleSubmit, register } = useForm()
  return (
    <form onSubmit={handleSubmit(data => signUp(data as SignUpData))}>
      <VStack spacing={2} justify="space-evenly" align="stretch" h="300px">
        <Text fontSize="sm">register</Text>
        <Input {...register('email')} type="email" placeholder="email" />
        <Input {...register('verifyEmail')} placeholder="verify email" />
        <Input
          {...register('password')}
          type="password"
          placeholder="password"
        />
        <Input
          {...register('verifyPassword')}
          type="password"
          placeholder="verify password"
        />
        <Button type="submit">register</Button>
      </VStack>
    </form>
  )
}

export default Register
