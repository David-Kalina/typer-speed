import { Flex, Icon } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import * as React from 'react'
import { VscDebugRestart } from 'react-icons/vsc'
import { resetTypingTestAtom, themeAtom } from '../store/typingTestAtoms'

const NewTest: React.FC = () => {
  const [, reset] = useAtom(resetTypingTestAtom)
  const [theme] = useAtom(themeAtom)

  return (
    <Flex>
      <Icon
        cursor="pointer"
        as={VscDebugRestart}
        fontSize="0.7em"
        onClick={reset}
        mt="1rem"
        mx="auto"
        color={`${theme}.textLight`}
      />
    </Flex>
  )
}

export default NewTest
