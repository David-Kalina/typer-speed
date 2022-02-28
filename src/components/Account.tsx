import { Box, Text, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { leaderBoardHeaders, personalFilters } from '../customization/filters'
import { testsRef } from '../firebase'
import { useRedirect } from '../hooks/useRedirect'
import { themeAtom } from '../store/themeAtoms'
import AccountStats from './AccountStats'
import FilterableTable from './FilterableTable'

function Account() {
  const { user } = useAuth()
  const [theme] = useAtom(themeAtom)
  useRedirect(user?.email === undefined, '/')

  if (user?.email) {
    return (
      <VStack w="100%" minH="100vh" h="max-content" align="stretch" spacing={8} color={theme.textLight}>
        <AccountStats />
        <Text textAlign="center" fontSize={['sm', 'md', 'lg', 'xl']}>
          Account created {user?.metadata.creationTime}
        </Text>
        <Box>
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
      </VStack>
    )
  } else {
    return null
  }
}

export default Account
