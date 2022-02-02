import { HStack, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { GiSpeedometer } from 'react-icons/gi'
import { ColorModeSwitcher } from '../ColorModeSwitcher'

function Header() {
  return (
    <HStack w="100%" py="12" px={['12', '12', 0]} justifyContent="space-between">
      <Flex align="center">
        <GiSpeedometer />
        <Text ml="4px">Typer Speed</Text>
      </Flex>

      <ColorModeSwitcher />
    </HStack>
  )
}

export default Header
