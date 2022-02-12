import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { GiSpeedometer } from 'react-icons/gi'
import { Link } from 'react-location'

function Index() {
  return (
    <Link to="/">
      <Flex align="center" cursor="pointer" fontSize="lg">
        <GiSpeedometer />
        <Text ml="4px">Typer Speed</Text>
      </Flex>
    </Link>
  )
}

export default Index
