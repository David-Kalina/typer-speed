import { Flex } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { testIdAtom } from '../../store/typingTestAtoms'
import ResultsChart from '../ResultsChart'
import ResultsText from '../ResultsText'

function Index() {
  const [testId] = useAtom(testIdAtom)

  return (
    <Flex p={[0, '4em']} flexDir={['column', 'row-reverse']} fontSize="0.4em">
      <ResultsChart testId={testId} />
      <ResultsText testId={testId} />
    </Flex>
  )
}

Index.displayName = 'TypingTest'

export default Index
