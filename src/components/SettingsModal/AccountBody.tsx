import { Flex, Box, VStack, Text, Button } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { userAtom } from '../../store/firebaseAtoms'
import { themeAtom } from '../../store/themeAtoms'

function AccountBody() {
  const [theme] = useAtom(themeAtom)
  const [user] = useAtom(userAtom)
  return (
    <>
      <Flex h="300px">
        <Box flex={2} h="inherit">
          {user?.email ? (
            <>
              <Text fontWeight="bold">account details</Text>
              <VStack mt="6" spacing={6} align="stretch" overflowY="scroll" overflowX="hidden" h="90%" pr="3">
                <Text>email: {user?.email}</Text>
                <Text>account created: {user?.metadata.creationTime}</Text>
              </VStack>
            </>
          ) : (
            <>
              <Text fontWeight="bold">account details</Text>
              <VStack mt="6" spacing={6} align="stretch" overflowY="scroll" overflowX="hidden" h="90%" pr="3">
                <Text>Guest</Text>
              </VStack>
            </>
          )}
        </Box>
        <Box flex={1} />
        <Box flex={2} h="inherit">
          <Text fontWeight="bold">manage account</Text>
          {user?.email ? (
            <VStack mt="6" spacing={6} align="stretch" overflowY="scroll" overflowX="hidden" h="90%" pr="3">
              <Button variant="outline">sign out</Button>
              <Button variant="outline">reset password</Button>
              <Button color={theme.incorrect} variant="outline">
                delete account
              </Button>
            </VStack>
          ) : (
            <VStack mt="6" spacing={6} align="stretch" overflowY="scroll" overflowX="hidden" h="90%" pr="3">
              <Button variant="outline">sign up</Button>
              <Button variant="outline">sign in</Button>
            </VStack>
          )}
        </Box>
      </Flex>
    </>
  )
}

export default AccountBody
