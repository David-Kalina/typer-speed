import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import Footer from './Footer'
import Header from './Header'

function Layout({ children }: { children: React.ReactNode[] | React.ReactNode }) {
  return (
    <Flex mx="auto" align="start" h="100vh" bg="brand.100" flexDir="column">
      <Flex
        fontFamily="Roboto Mono"
        flexDir="column"
        mx="auto"
        h="100vh"
        w={['100%', '100%', '100%', '100%']}
        justify={['start', 'start', 'space-between', 'space-between']}
        align="center"
        maxW="1000px"
      >
        <Header />
        {children}
        <Footer />
      </Flex>
    </Flex>
  )
}

export default Layout
