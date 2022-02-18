import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { Link } from 'react-location'
import { useAuth } from '../contexts/AuthContext'
import { useRedirect } from '../hooks/useRedirect'
import { themeAtom } from '../store/typingTestAtoms'
import AccountStats from './AccountStats'
import TypingTestsTable from './TypingTestsTable'

function Account() {
  const { user } = useAuth()
  useRedirect(!user?.email, '/')

  const [theme] = useAtom(themeAtom)

  if (user?.email) {
    return (
      <VStack w="100%" minH="100vh" h="max-content" align="stretch" spacing={8}>
        <AccountStats />
        <Text textAlign="center" fontSize={['sm', 'md', 'lg', 'xl']} color={`${theme}.300`}>
          Account created {user?.metadata.creationTime}
        </Text>
        <Box>
          <TypingTestsTable />
        </Box>

        <Flex mx="auto" w="100%" justify="center">
          <Link to="/">{/* <Button onClick={reset}>Take a test</Button> */}</Link>
        </Flex>
      </VStack>
    )
  } else {
    return null
  }
}

export default Account
