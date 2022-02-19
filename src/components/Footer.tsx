import { Flex, HStack, Link, Text, useBreakpoint, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { GoLogoGithub } from 'react-icons/go'
import { themeAtom } from '../store/typingTestAtoms'

function Footer() {
  const breakpoint = useBreakpoint()
  const [theme] = useAtom(themeAtom)

  if (breakpoint === 'md' || breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl') {
    return (
      <HStack w="100%" p="12" justifyContent="space-between" fontSize="sm" color={`${theme}.textLight`}>
        <Link
          cursor="pointer"
          href="https://github.com/David-Kalina/typing-speed-test-with-socket.io-client"
          isExternal
        >
          <Flex align="center">
            <GoLogoGithub />
            <Text ml="4px">github</Text>
          </Flex>
        </Link>
      </HStack>
    )
  } else {
    return (
      <VStack w="100%" p="12" align="stretch" fontSize="sm">
        <Link
          cursor="pointer"
          href="https://github.com/David-Kalina/typing-speed-test-with-socket.io-client"
          isExternal
        >
          <Flex align="center">
            <GoLogoGithub />
            <Text ml="4px">github</Text>
          </Flex>
        </Link>
      </VStack>
    )
  }
}

export default Footer
