import { Button, HStack, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { useState } from 'react'
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
      <ModalContent bg={`${theme}.200`}>
        <ModalHeader>
          <HStack spacing={0}>
            <Button
              onClick={() => setCurrentBody(0)}
              size="sm"
              borderRightRadius="none"
              variant={currentBody === 0 ? 'solid' : 'outline'}
            >
              caret
            </Button>
            <Button
              onClick={() => setCurrentBody(1)}
              size="sm"
              borderRadius="none"
              variant={currentBody === 1 ? 'solid' : 'outline'}
            >
              font
            </Button>
            <Button
              onClick={() => setCurrentBody(2)}
              size="sm"
              borderRadius="none"
              variant={currentBody === 2 ? 'solid' : 'outline'}
            >
              time
            </Button>
            <Button
              onClick={() => setCurrentBody(3)}
              size="sm"
              borderRadius="none"
              variant={currentBody === 3 ? 'solid' : 'outline'}
            >
              theme
            </Button>
            <Button
              onClick={() => setCurrentBody(4)}
              size="sm"
              borderRadius="none"
              variant={currentBody === 4 ? 'solid' : 'outline'}
            >
              words
            </Button>
            <Button
              onClick={() => setCurrentBody(4)}
              size="sm"
              borderLeftRadius="none"
              variant={currentBody === 5 ? 'solid' : 'outline'}
            >
              account
            </Button>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        {bodies[currentBody]}
      </ModalContent>
    </Modal>
  )
}

Index.displayName = 'Settings Modal'

export default Index
