import { Flex } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { fontFamilyAtom, themeAtom } from '../store/typingTestAtoms'
import Footer from './Footer'
import Header from './Header'
import SettingsModal from './SettingsModal'

function Layout({ children }: { children: React.ReactNode[] | React.ReactNode }) {
  const [theme] = useAtom(themeAtom)
  const [fontFamily] = useAtom(fontFamilyAtom)
  return (
    <Flex mx="auto" align="start" minH="100vh" h="max-content" bg={`${theme}.100`} flexDir="column" p={['8', '0']}>
      <Flex
        flexDir="column"
        mx="auto"
        h="max-content"
        minH="100vh"
        w="100%"
        fontFamily={fontFamily}
        justify="space-between"
        align="center"
        maxW="1000px"
      >
        <Header />
        {children}
        <Footer />
        <SettingsModal />
      </Flex>
    </Flex>
  )
}

export default Layout
