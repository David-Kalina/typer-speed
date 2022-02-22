import { CloseButton, Flex, Slide, Text, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { FaKeyboard, FaUser } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { GiHamburgerMenu, GiSpeedometer } from 'react-icons/gi'
import { Link } from 'react-location'
import { useAuth } from '../contexts/AuthContext'
import { useToggle } from '../hooks/useToggle'
import { themeAtom } from '../store/themeAtoms'

function MobileHeader() {
  const { user, signOutUser } = useAuth()

  const [isOpen, toggle] = useToggle(false)

  const [theme] = useAtom(themeAtom)

  return (
    <Flex w="100%" mx="auto" zIndex={999} align="center" justify="space-between" color={`${theme}.textLight`}>
      <Link to="/">
        <Flex align="center" cursor="pointer" fontSize="lg">
          <GiSpeedometer />
          <Text ml="4px">Typer Speed</Text>
        </Flex>
      </Link>
      <GiHamburgerMenu onClick={() => toggle(true)} cursor="pointer" />

      <Slide in={isOpen} direction="right">
        <VStack align="stretch" w="90vw" p="4" bg={`${theme}.100`} opacity={1} h="100%" ml="auto">
          <Flex align="center" cursor="pointer" justify="space-between">
            <Flex align="center" cursor="pointer" fontSize="lg">
              <GiSpeedometer />
              <Text ml="2">Typer Speed</Text>
            </Flex>
            <CloseButton onClick={() => toggle(false)} />
          </Flex>
          <Flex align="center" cursor="pointer" h="30px" p="2" borderRadius="sm">
            <FaKeyboard />
            <Text fontSize="sm" ml="2">
              Take a test
            </Text>
          </Flex>
          <Link to={user?.email ? '/account' : '/login'}>
            <Flex align="center" cursor="pointer" h="30px" p="2" borderRadius="sm" pos="relative">
              <FaUser />
              <Text ml="2" fontSize="xs">
                {user?.email || 'Sign in'}
              </Text>
            </Flex>
          </Link>
          <VStack spacing={4} align="stretch">
            {user?.email && (
              <Flex align="center" onClick={signOutUser} cursor="pointer" h="30px" p="2" borderRadius="sm">
                <FiLogOut />
                <Text ml="2" fontSize="xs">
                  Sign out
                </Text>
              </Flex>
            )}
          </VStack>
        </VStack>
      </Slide>
    </Flex>
  )
}

export default MobileHeader
