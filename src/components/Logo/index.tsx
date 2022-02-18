import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-location'

function Index() {
  return (
    <Flex align="center" cursor="pointer" fontSize="lg">
      <Link to="/">
        <Text ml="4px">Typer Speed</Text>
      </Link>
    </Flex>
  )
}

export default Index
