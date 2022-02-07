import { Badge, Flex, HStack, Text, useBreakpoint } from '@chakra-ui/react'
import React from 'react'
import { FaKeyboard, FaUser, FaUserAlt } from 'react-icons/fa'
import { FiLogOut, FiUser } from 'react-icons/fi'
import { GiSpeedometer } from 'react-icons/gi'
import { Link, useLocation } from 'react-location'
import { ColorModeSwitcher } from '../ColorModeSwitcher'
import { useAuth } from '../contexts/AuthContext'
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
      <HStack w="100%" py="12" px={['12', '12', 0]} justifyContent="space-between">
        <HStack spacing={6}>
          <Link to="/">
            <Flex align="center" cursor="pointer" fontSize="lg">
              <GiSpeedometer />
              <Text ml="4px">Typer Speed</Text>
            </Flex>
          </Link>
          <Link to="/"></Link>
          <Link to={user?.email ? '/account' : '/login'}>
            <Flex align="center" cursor="pointer" pos="relative">
              <FiUser />
              <Text ml="4px" fontSize="xs">
                {user?.email}
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
          <ColorModeSwitcher />
        </HStack>
      </HStack>
    )
  }
}

export default Header
