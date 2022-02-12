import { Flex, HStack, Text, useBreakpoint } from '@chakra-ui/react'
import React from 'react'
import { FiLogOut, FiUser } from 'react-icons/fi'
import { Link, useLocation } from 'react-location'
import { useAuth } from '../contexts/AuthContext'
import Logo from './Logo'
import MobileHeader from './MobileHeader'
import SetTestTime from './SetTestTime'

function Header() {
  const { user, signOutUser } = useAuth()

  const { current } = useLocation()

  const breakpoint = useBreakpoint()

  if (breakpoint === 'base' || breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md') {
    return <MobileHeader />
  } else {
    return (
      <HStack w="100%" py="12" px={['12', '12', 0]} justifyContent="space-between" color="white">
        <HStack spacing={6}>
          <Logo />
          <Link to="/"></Link>
          <Link to={user?.email ? '/account' : '/login'}>
            <Flex align="center" cursor="pointer" pos="relative">
              <FiUser />
              <Text ml="4px" fontSize="xs">
                {user?.email} {!user?.email ? 'sign in' : null}
              </Text>
            </Flex>
          </Link>
        </HStack>
        <HStack spacing={4}>
          <SetTestTime />
          {user?.email && current.pathname === '/account' ? (
            <Flex align="center" onClick={signOutUser} cursor="pointer">
              <FiLogOut />
              <Text ml="4px" fontSize="xs">
                Sign out
              </Text>
            </Flex>
          ) : null}
        </HStack>
      </HStack>
    )
  }
}

export default Header
