import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-location'
import { useAuth } from '../contexts/AuthContext'
import { useRedirect } from '../hooks/useRedirect'
import { useResetTypingTest } from '../hooks/useResetTypingTest'
import AccountStats from './AccountStats'
import TypingTestsTable from './TypingTestsTable'

function Account() {
  const { user } = useAuth()
  const reset = useResetTypingTest()
  useRedirect(!user?.email, '/')

  if (user?.email) {
    return (
      <VStack w="100%" h="100%" align="stretch" spacing={8}>
        <AccountStats />
        <Text textAlign="center" fontSize={['sm', 'md', 'lg', 'xl']} color="white">
          Account created {user?.metadata.creationTime}
        </Text>
        <Box>
          <TypingTestsTable />
        </Box>

        <Flex mx="auto" w="100%" justify="center">
          <Link to="/">
            <Button onClick={reset}>Take a test</Button>
          </Link>
        </Flex>
      </VStack>
    )
  } else {
    return null
  }
}

export default Account
