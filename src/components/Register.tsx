import { Button, Input, Text, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { useForm } from 'react-hook-form'
import { SignUpData, useAuth } from '../contexts/AuthContext'
import { themeAtom } from '../store/themeAtoms'

function Register() {
  const { signUp } = useAuth()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const [error, setError] = React.useState<string | null>(null)

  const [theme] = useAtom(themeAtom)

  return (
    <form
      onSubmit={handleSubmit(async data => {
        await signUp(data as SignUpData).catch((error: string) => setError(error))
      })}
    >
      {error && <Text color="red.200">{error}</Text>}
      <VStack spacing={2} justify="space-evenly" align="stretch" minH="300px" height="max">
        <Text fontSize="sm" textColor="white">
          register
        </Text>
        <Input {...register('email', { required: 'required' })} textColor="white" type="email" placeholder="email" />
        {errors.email && (
          <Text color="red.200" fontSize="xs">
            {errors.email.message}
          </Text>
        )}
        <Input {...register('verifyEmail', { required: 'required' })} textColor="white" placeholder="verify email" />
        {errors.verifyEmail && (
          <Text color="red.200" fontSize="xs">
            {errors.verifyEmail.message}
          </Text>
        )}
        <Input {...register('password', { required: 'required' })} type="password" placeholder="password" />
        {errors.verifyPassword && (
          <Text color="red.200" fontSize="xs">
            {errors.verifyPassword.message}
          </Text>
        )}
        <Input
          {...register('verifyPassword', { required: 'required' })}
          type="password"
          placeholder="verify password"
        />
        {errors.verifyPassword && <Text fontSize="xs">{errors.verifyPassword.message}</Text>}
        <Button type="submit" bg={`${theme}.300`} color={`${theme}.textDark`}>
          register
        </Button>
      </VStack>
    </form>
  )
}

export default Register
