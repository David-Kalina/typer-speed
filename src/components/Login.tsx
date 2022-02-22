import { Button, Flex, IconButton, Input, Text, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoLogoGoogle } from 'react-icons/io'
import { SignInData, useAuth } from '../contexts/AuthContext'
import { themeAtom } from '../store/themeAtoms'
function Login() {
  const { signIn, signInWithGoogle } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [error, setError] = useState<string | null>(null)

  const [theme] = useAtom(themeAtom)

  return (
    <form onSubmit={handleSubmit(data => signIn(data as SignInData).catch(error => setError(error)))}>
      {error && <Text color="red.200">{error}</Text>}
      <VStack spacing={2} justify="space-evenly" align="stretch" h="300px">
        <Flex align="center" justify="space-between">
          <Text fontSize="sm" textColor="white">
            login
          </Text>
          <Text fontSize="sm" textColor="white">
            forgot password?
          </Text>
        </Flex>
        <Input {...register('email', { required: 'required' })} textColor="white" type="email" placeholder="email" />
        {errors.email && <Text fontSize="xs">{errors.email.message}</Text>}
        <Input
          {...register('password', { required: 'required' })}
          textColor="white"
          type="password"
          placeholder="password"
        />
        <Button bg={theme.correct} color={theme.textDark} type="submit">
          login
        </Button>
        <Text textAlign="center" textColor="white">
          or
        </Text>
        <IconButton
          bg={theme.correct}
          color={theme.textDark}
          onClick={signInWithGoogle}
          aria-label="google sign in method"
          icon={<IoLogoGoogle />}
        ></IconButton>
      </VStack>
    </form>
  )
}

export default Login
