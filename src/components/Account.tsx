import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { Link } from 'react-location'
import { useAuth } from '../contexts/AuthContext'
import { leaderBoardHeaders, personalFilters, personalHeaders } from '../customization/filters'
import { testsRef } from '../firebase'
import { useRedirect } from '../hooks/useRedirect'
import { themeAtom } from '../store/themeAtoms'
import AccountStats from './AccountStats'
import FilterableTable from './FilterableTable'
import TypingTestsTable from './TypingTestsTable'

function Account() {
  const { user } = useAuth()
  useRedirect(user?.email === undefined, '/')
  const [theme] = useAtom(themeAtom)

  if (user?.email) {
    return (
      <VStack w="100%" minH="100vh" h="max-content" align="stretch" spacing={8} color={theme.textLight}>
        <AccountStats />
        <Text textAlign="center" fontSize={['sm', 'md', 'lg', 'xl']}>
          Account created {user?.metadata.creationTime}
        </Text>
        <Box>
          {/* <TypingTestsTable /> */}
          <FilterableTable
            personal
            competitive={true}
            size="lg"
            target="email"
            orderTarget="date"
            orderStyle="desc"
            filters={personalFilters}
            headers={leaderBoardHeaders}
            caption={'Recent Typing Tests'}
            documentReference={testsRef}
            targetLimit={10}
          />
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
