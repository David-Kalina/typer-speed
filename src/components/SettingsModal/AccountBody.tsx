import {
  Flex,
  Box,
  VStack,
  Text,
  Button,
  Modal,
  ModalContent,
  useDisclosure,
  ModalCloseButton,
  ModalBody,
  HStack,
  ModalHeader,
} from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import React, { useState } from 'react'
import { Link } from 'react-location'
import { useAuth } from '../../contexts/AuthContext'
import { userAtom } from '../../store/firebaseAtoms'
import { themeAtom } from '../../store/themeAtoms'
import { accountDeletionModalOpen, settingsOpenAtom } from '../../store/typingTestAtoms'

function AreYouSureModal() {
  const [theme] = useAtom(themeAtom)

  const [open, setOpen] = useAtom(accountDeletionModalOpen)

  const { deleteAccount } = useAuth()

  return (
    <Modal isOpen={open} onClose={() => ''} isCentered size="4xl">
      <ModalContent bg={theme.modal} h="400px" color={theme.correct}>
        <ModalHeader>Are you sure you want to delete your account?</ModalHeader>
        <ModalCloseButton color={theme.correct} onClick={() => setOpen(false)} />
        <ModalBody>
          <Flex h="100%" align="center" justify="space-around">
            <Button flex={1} maxW="300px" color={theme.incorrect} variant="outline" onClick={deleteAccount}>
              yes
            </Button>

            <Button flex={1} maxW="300px" color={theme.correct} variant="outline" onClick={() => setOpen(false)}>
              no
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

function AccountBody() {
  const [theme] = useAtom(themeAtom)
  const [user] = useAtom(userAtom)
  const setSettingsOpen = useUpdateAtom(settingsOpenAtom)
  const openAccountDeletionModal = useUpdateAtom(accountDeletionModalOpen)
  const { signOutUser } = useAuth()

  return (
    <>
      <Flex h="300px">
        <Box flex={2} h="inherit">
          {user?.email ? (
            <>
              <Text fontWeight="bold">Account details</Text>
              <VStack mt="6" spacing={6} align="stretch" overflowY="scroll" overflowX="hidden" h="90%" pr="3">
                <Text>email: {user?.email}</Text>
                <Text>account created: {user?.metadata.creationTime}</Text>
              </VStack>
            </>
          ) : (
            <>
              <Text fontWeight="bold">Account details</Text>
              <VStack mt="6" spacing={6} align="stretch" overflowY="scroll" overflowX="hidden" h="90%" pr="3">
                <Text>Guest</Text>
              </VStack>
            </>
          )}
        </Box>
        <Box flex={1} />
        <Box flex={2} h="inherit">
          <Text fontWeight="bold">Manage account</Text>
          {user?.email ? (
            <VStack mt="6" spacing={6} align="stretch" overflowY="scroll" overflowX="hidden" h="90%" pr="3">
              <Button variant="outline" onClick={signOutUser}>
                sign out
              </Button>
              <Button variant="outline">reset password</Button>
              <Button color={theme.incorrect} variant="outline" onClick={() => openAccountDeletionModal(true)}>
                delete account
              </Button>
            </VStack>
          ) : (
            <VStack mt="6" spacing={6} align="stretch" overflowY="scroll" overflowX="hidden" h="90%" pr="3">
              <Link to="/login" onClick={() => setSettingsOpen(false)}>
                <Button variant="outline" w="100%">
                  sign up
                </Button>
              </Link>

              <Link to="/login" onClick={() => setSettingsOpen(false)}>
                <Button variant="outline" w="100%">
                  sign in
                </Button>
              </Link>
            </VStack>
          )}
        </Box>
        <AreYouSureModal />
      </Flex>
    </>
  )
}

export default AccountBody
