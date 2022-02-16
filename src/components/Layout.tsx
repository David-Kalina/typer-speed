import { Flex } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { themeAtom } from '../store/typingTestAtoms'
import Footer from './Footer'
import Header from './Header'

function Layout({ children }: { children: React.ReactNode[] | React.ReactNode }) {
  const [theme] = useAtom(themeAtom)
  return (
    <Flex mx="auto" align="start" h="100vh" bg={`${theme}.100`} flexDir="column">
      <Flex
        flexDir="column"
        mx="auto"
        h="100vh"
        w="100%"
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
