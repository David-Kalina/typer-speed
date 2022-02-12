import {
  Box,
  CloseButton,
  Flex,
  Slide,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { FaKeyboard, FaUser } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { GiHamburgerMenu, GiSpeedometer } from 'react-icons/gi'
import { Link, useLocation } from 'react-location'
import { ColorModeSwitcher } from '../ColorModeSwitcher'
import { useAuth } from '../contexts/AuthContext'
import { useToggle } from '../hooks/useToggle'

function MobileHeader() {
  const { user, signOutUser } = useAuth()

  const { current } = useLocation()
  const [isOpen, toggle] = useToggle(false)

  useEffect(() => {
    toggle(false)
  }, [current.pathname, toggle, user])

  return (
    <Flex
      w="80%"
      mx="auto"
      zIndex={999}
      align="center"
      justify="space-between"
      p={[4, 4, 4, 0]}
    >
      <Link to="/">
        <Flex align="center" cursor="pointer" fontSize="lg">
          <GiSpeedometer />
          <Text ml="4px">Typer Speed</Text>
        </Flex>
      </Link>
      <GiHamburgerMenu onClick={() => toggle(true)} />

      <Slide in={isOpen} direction="right">
        <VStack
          align="stretch"
          w="80vw"
          p="4"
          bg={useColorModeValue('white', 'gray.800')}
          opacity={1}
          h="100%"
          ml="auto"
        >
          <Link to="/">
            <Flex align="center" cursor="pointer" justify="space-between">
              <Flex align="center" cursor="pointer" fontSize="lg">
                <GiSpeedometer />
                <Text ml="2">Typer Speed</Text>
              </Flex>
              <CloseButton onClick={() => toggle(false)} />
            </Flex>
          </Link>
          <Link to="/">
            <Flex
              align="center"
              cursor="pointer"
              h="30px"
              p="2"
              borderRadius="sm"
            >
              <FaKeyboard />
              <Text fontSize="sm" ml="2">
                Take a test
              </Text>
            </Flex>
          </Link>
          <Link to={user?.email ? '/account' : '/login'}>
            <Flex
              align="center"
              cursor="pointer"
              h="30px"
              p="2"
              borderRadius="sm"
              pos="relative"
            >
              <FaUser />
              <Text ml="2" fontSize="xs">
                {user?.email || 'Sign in'}
              </Text>
            </Flex>
          </Link>
          <VStack spacing={4} align="stretch">
            {user?.email && (
              <Flex
                align="center"
                onClick={signOutUser}
                cursor="pointer"
                h="30px"
                p="2"
                borderRadius="sm"
              >
                <FiLogOut />
                <Text ml="2" fontSize="xs">
                  Sign out
                </Text>
              </Flex>
            )}
            <Flex px="2" align="center">
              <ColorModeSwitcher />
              <Text ml="2" fontSize="sm">
                Toggle theme
              </Text>
            </Flex>
          </VStack>
        </VStack>
      </Slide>

      {isOpen && (
        <Box
          display="inline"
          bg="rgba(0, 0, 0, 0.1)"
          h="100vh"
          w="100vw"
          pos="absolute"
          zIndex={-1}
          top={0}
          left={0}
        />
      )}
    </Flex>
  )
}

export default MobileHeader
