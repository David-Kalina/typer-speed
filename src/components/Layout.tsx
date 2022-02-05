import { Flex, Box } from '@chakra-ui/react'
import React from 'react'
import Header from './Header'
import Footer from './Footer'

function Layout({
  children,
  height = 'unset',
}: {
  children: React.ReactNode[] | React.ReactNode
  height?: '100%' | 'unset'
}) {
  return (
    <>
      <Flex
        mx="auto"
        justify={['start', 'start', 'space-between', 'space-between']}
        align="start"
        h="100vh"
        flexDir="column"
        overflow="hidden"
        w={['100%', '100%', '900px']}
      >
        <Header />

        <Box
          mx="auto"
          p={[2, 2, 2, 0]}
          h={['100%', '100%', height]}
          overflow="hidden"
          mb={['auto', 'auto', 'unset']}
          w="100%"
        >
          {children}
        </Box>

        <Footer />
      </Flex>
    </>
  )
}

export default Layout
