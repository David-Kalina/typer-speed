import { Button, HStack, IconButton, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { settingsOpenAtom, themeAtom } from '../../store/typingTestAtoms'
import CaretBody from './CaretBody'
import FontBody from './FontBody'
import ThemeBody from './ThemeBody'

function Index() {
  const [theme] = useAtom(themeAtom)

  const [settingsOpen, setSettingsOpen] = useAtom(settingsOpenAtom)

  const bodies: { [key: number]: JSX.Element } = {
    0: <CaretBody />,
    1: <FontBody />,
    2: <ThemeBody />,
  }

  const [currentBody, setCurrentBody] = useState(0)

  return (
    <Modal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} isCentered size="4xl">
      <ModalOverlay />
      <ModalContent bg={`${theme}.100`} color={`${theme}.200`} border="1px solid grey">
        <ModalHeader p="1" mb="5">
          <HStack spacing={0} w="100%" h="100%">
            <Button
              _focus={{ borderX: 'none', borderTop: 'none' }}
              _hover={{ bg: 'inherit', borderBottom: '1px solid grey' }}
              flex={1}
              bg={`${theme}.100`}
              onClick={() => setCurrentBody(0)}
              size="sm"
              borderBottom={currentBody === 0 ? '1px solid grey' : 'none'}
              borderRadius="none"
            >
              caret
            </Button>
            <Button
              _focus={{ borderX: 'none', borderTop: 'none' }}
              _hover={{ bg: 'inherit', borderBottom: '1px solid grey' }}
              flex={1}
              bg={`${theme}.100`}
              onClick={() => setCurrentBody(1)}
              size="sm"
              borderBottom={currentBody === 1 ? '1px solid grey' : 'none'}
              borderRadius="none"
            >
              font
            </Button>
            <Button
              _focus={{ borderX: 'none', borderTop: 'none' }}
              _hover={{ bg: 'inherit', borderBottom: '1px solid grey' }}
              flex={1}
              bg={`${theme}.100`}
              onClick={() => setCurrentBody(2)}
              size="sm"
              borderBottom={currentBody === 2 ? '1px solid grey' : 'none'}
              borderRadius="none"
            >
              time
            </Button>
            <Button
              _focus={{ borderX: 'none', borderTop: 'none' }}
              _hover={{ bg: 'inherit', borderBottom: '1px solid grey' }}
              flex={1}
              bg={`${theme}.100`}
              onClick={() => setCurrentBody(3)}
              size="sm"
              borderBottom={currentBody === 3 ? '1px solid grey' : 'none'}
              borderRadius="none"
            >
              theme
            </Button>
            <Button
              _focus={{ borderX: 'none', borderTop: 'none' }}
              _hover={{ bg: 'inherit', borderBottom: '1px solid grey' }}
              flex={1}
              bg={`${theme}.100`}
              onClick={() => setCurrentBody(4)}
              size="sm"
              borderBottom={currentBody === 4 ? '1px solid grey' : 'none'}
              borderRadius="none"
            >
              words
            </Button>
            <Button
              _focus={{ borderX: 'none', borderTop: 'none' }}
              _hover={{ bg: 'inherit', borderBottom: '1px solid grey' }}
              flex={1}
              bg={`${theme}.100`}
              onClick={() => setCurrentBody(5)}
              size="sm"
              borderBottom={currentBody === 5 ? '1px solid grey' : 'none'}
              borderRadius="none"
            >
              account
            </Button>
            <IconButton
              aria-label="close"
              _focus={{ borderX: 'none', borderTop: 'none' }}
              _hover={{ bg: 'inherit', borderBottom: '1px solid grey' }}
              flex={1}
              bg={`${theme}.100`}
              size="sm"
              icon={<IoMdClose />}
              borderRadius="none"
              onClick={() => setSettingsOpen(false)}
            />
          </HStack>
        </ModalHeader>
        <ModalBody w="80%" mx="auto" p="4">
          {bodies[currentBody]}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

Index.displayName = 'Settings Modal'

export default Index
