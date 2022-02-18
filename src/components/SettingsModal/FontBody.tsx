import { Button, HStack, ModalBody, SimpleGrid, Stack, useTheme } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { fontSizeAtom, themeAtom } from '../../store/typingTestAtoms'

function FontBody() {
  const [font, setFont] = useAtom(fontSizeAtom)
  return (
    <ModalBody minH="325px" pb="16" fontSize="sm">
      <HStack>
        <Button onClick={() => setFont(1)}>1</Button>
        <Button onClick={() => setFont(2)}>2</Button>
        <Button onClick={() => setFont(3)}>3</Button>
        <Button onClick={() => setFont(4)}>4</Button>
      </HStack>
    </ModalBody>
  )
}

export default FontBody
