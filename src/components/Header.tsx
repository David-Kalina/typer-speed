import { HStack, Flex, Text, Box } from '@chakra-ui/react'
import React from 'react'
import { FiSettings } from 'react-icons/fi'
import { GiSpeedometer } from 'react-icons/gi'
import { ColorModeSwitcher } from '../ColorModeSwitcher'

function Header() {
  return (
    <HStack w="100%" py="12" px={['12', '12', 0]} justifyContent="space-between">
      <HStack>
        <Flex align="center">
          <GiSpeedometer />
          <Text ml="4px">Typer Speed</Text>
        </Flex>
        <FiSettings />
      </HStack>

      <Box>
        <ColorModeSwitcher />
      </Box>
    </HStack>
  )
}

export default Header
