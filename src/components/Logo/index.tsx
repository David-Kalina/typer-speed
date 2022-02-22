import { Flex, Text } from '@chakra-ui/react'
import { useUpdateAtom } from 'jotai/utils'
import React from 'react'
import { Link } from 'react-location'
import { resetTypingTestAtom } from '../../store/typingTestAtoms'

function Index() {
  const reset = useUpdateAtom(resetTypingTestAtom)

  return (
    <Flex
      align="center"
      cursor="pointer"
      fontSize="lg"
      onClick={() => {
        reset()
      }}
    >
      <Link to="/">
        <Text ml="4px">Typer Speed</Text>
      </Link>
    </Flex>
  )
}

export default Index
