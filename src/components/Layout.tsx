import { Flex, Box } from '@chakra-ui/react'
import React from 'react'
import Header from './Header'
import Footer from './Footer'

function Layout({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode
}) {
  return (
    <>
      <Flex
        mx="auto"
        justify={['start', 'start', 'space-between', 'space-between']}
        align="start"
        h="100vh"
        flexDir="column"
        w={['100%', '100%', '100%', '900px']}
      >
        <Header />

        <Box
          mx="auto"
          p={[4, 4, 4, 0]}
          minH={['100vh', '100vh', 'unset']}
          h="max-content"
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
