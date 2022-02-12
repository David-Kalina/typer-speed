import { Flex, Icon } from '@chakra-ui/react'
import * as React from 'react'
import { VscDebugRestart } from 'react-icons/vsc'
import { useResetTypingTest } from '../hooks/useResetTypingTest'

const StartTest: React.FC = () => {
  const reset = useResetTypingTest()

  return (
    <Flex>
      <Icon
        cursor="pointer"
        as={VscDebugRestart}
        w="200px"
        fontSize="1.5em"
        onClick={reset}
        mt="1rem"
        mx="auto"
        color="white"
      />
    </Flex>
  )
}

export default StartTest
