import { Button, Input, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { SignUpData, useAuth } from '../contexts/AuthContext'

function Register() {
  const { signUp } = useAuth()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const [error, setError] = React.useState<string | null>(null)

  useEffect(() => {
    console.log(error)
  }, [error])

  return (
    <form
      onSubmit={handleSubmit(async data => {
        await signUp(data as SignUpData).catch((error: string) =>
          setError(error)
        )
      })}
    >
      {error && <Text color="red.200">{error}</Text>}
      <VStack
        spacing={2}
        justify="space-evenly"
        align="stretch"
        minH="300px"
        height="max"
      >
        <Text fontSize="sm">register</Text>
        <Input
          {...register('email', { required: 'required' })}
          type="email"
          placeholder="email"
        />
        {errors.email && (
          <Text color="red.200" fontSize="xs">
            {errors.email.message}
          </Text>
        )}
        <Input
          {...register('verifyEmail', { required: 'required' })}
          placeholder="verify email"
        />
        {errors.verifyEmail && (
          <Text color="red.200" fontSize="xs">
            {errors.verifyEmail.message}
          </Text>
        )}
        <Input
          {...register('password', { required: 'required' })}
          type="password"
          placeholder="password"
        />
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
        {errors.verifyPassword && (
          <Text color="red.200" fontSize="xs">
            {errors.verifyPassword.message}
          </Text>
        )}
        <Button type="submit">register</Button>
      </VStack>
    </form>
  )
}

export default Register
