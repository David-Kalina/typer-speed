import { IconButton, Tooltip } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import * as React from 'react'
import { VscDebugRestart } from 'react-icons/vsc'
import { themeAtom } from '../store/themeAtoms'
import { resetTypingTestAtom } from '../store/typingTestAtoms'

const NewTest: React.FC = () => {
  const [, reset] = useAtom(resetTypingTestAtom)
  const [theme] = useAtom(themeAtom)

  return (
    <Tooltip label="start over">
      <IconButton
        aria-label="reset-test"
        variant="ghost"
        cursor="pointer"
        icon={<VscDebugRestart />}
        fontSize="0.7em"
        onClick={reset}
        mt="1rem"
        mx="auto"
        color={theme.textLight}
      />
    </Tooltip>
  )
}

export default NewTest
