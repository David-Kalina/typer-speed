import { Flex, Icon } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import * as React from 'react'
import { VscDebugRestart } from 'react-icons/vsc'
import { mountCaretAtom } from '../store/caretAtoms'
import { caretElementAtom } from '../store/elementAtoms'
import { themeAtom } from '../store/typingTestAtoms'

const NewTest: React.FC = () => {
  // const [, reset] = useAtom(resetTypingTestAtom)
  const [, mountCaret] = useAtom(mountCaretAtom)
  const [caretElement] = useAtom(caretElementAtom)
  const [theme] = useAtom(themeAtom)

  const resetTest = () => {
    // reset()
    mountCaret(caretElement as HTMLDivElement)
  }

  return (
    <Flex>
      <Icon
        cursor="pointer"
        as={VscDebugRestart}
        w="200px"
        fontSize="1.5em"
        onClick={resetTest}
        mt="1rem"
        mx="auto"
        color={`${theme}.200`}
      />
    </Flex>
  )
}

export default NewTest
