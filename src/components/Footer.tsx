import { Flex, HStack, Link, Text, useBreakpoint, VStack } from '@chakra-ui/react'
import React from 'react'
import { CgWebsite } from 'react-icons/cg'
import { FiServer } from 'react-icons/fi'
import { GoBrowser } from 'react-icons/go'

function Footer() {
  const breakpoint = useBreakpoint()

  if (breakpoint === 'md' || breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl') {
    return (
      <HStack w="100%" p="12" justifyContent="space-between">
        <Link cursor="pointer" href="https://davidkalina.dev" isExternal>
          <Flex align="center">
            <CgWebsite />
            <Text ml="4px">davidkalina.dev</Text>
          </Flex>
        </Link>
        <Link
          cursor="pointer"
          href="https://github.com/David-Kalina/typing-speed-test-with-socket.io-client"
          isExternal
        >
          <Flex align="center">
            <GoBrowser />
            <Text ml="4px">client github</Text>
          </Flex>
        </Link>
        <Link
          cursor="pointer"
          href="https://github.com/David-Kalina/typing-speed-test-server"
          isExternal
        >
          <Flex align="center">
            <FiServer />
            <Text ml="4px">server github</Text>
          </Flex>
        </Link>
      </HStack>
    )
  } else {
    return (
      <VStack w="100%" p="12" align="stretch">
        <Link cursor="pointer" href="https://davidkalina.dev" isExternal>
          <Flex align="center">
            <CgWebsite />
            <Text ml="4px">davidkalina.dev</Text>
          </Flex>
        </Link>
        <Link
          cursor="pointer"
          href="https://github.com/David-Kalina/typing-speed-test-with-socket.io-client"
          isExternal
        >
          <Flex align="center">
            <GoBrowser />
            <Text ml="4px">client github</Text>
          </Flex>
        </Link>
        <Link
          cursor="pointer"
          href="https://github.com/David-Kalina/typing-speed-test-server"
          isExternal
        >
          <Flex align="center">
            <FiServer />
            <Text ml="4px">server github</Text>
          </Flex>
        </Link>
      </VStack>
    )
  }
}

export default Footer
