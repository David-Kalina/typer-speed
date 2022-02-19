import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tr,
  useBreakpoint,
} from '@chakra-ui/react'
import { getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { testsRef } from '../firebase'
import { useToggle } from '../hooks/useToggle'
import { userAtom } from '../store/firebaseAtoms'
import { themeAtom } from '../store/typingTestAtoms'
import ResultsChart from './ResultsChart'
import TableFilters from './TableFilters'
import TableHeads from './TableHeads'

interface TypingTestData {
  email: string
  wpm: number
  accuracy: number
  seconds: number
  date: {
    seconds: number
    nanoseconds: number
  }
  recap: {
    wpm: number
    seconds: number
    incorrect: number
  }[]
  testId: string
}

function TypingTestsTable() {
  const [user] = useAtom(userAtom)
  const [theme] = useAtom(themeAtom)
  const breakpoint = useBreakpoint()
  const [tableData, setTableData] = useState<TypingTestData[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('date')
  const [testId, setTestId] = useState('')
  const [toggleChart, setToggleChart] = useToggle(false)

  const toggleFilter = (filter: string) => {
    setFilter(filter)
  }

  useEffect(() => {
    const q = query(testsRef, where('email', '==', user?.email), orderBy(filter), limit(10))

    getDocs(q)
      .then(snapshot => {
        setLoading(true)
        setTableData(snapshot.docs.map(doc => doc.data()) as TypingTestData[])
      })
      .then(() => setLoading(false))
      .catch(err => console.error(err))
  }, [user?.email, filter])

  const tableRows = tableData?.map((test, idx) => (
    <Tr key={idx} fontWeight="bold">
      <Td color={`${theme}.text`}>{test.seconds}s</Td>
      <Td color={`${theme}.text`}>{test.wpm}</Td>
      <Td color={`${theme}.text`}>{test.accuracy}%</Td>
      <Td color={`${theme}.text`}>{new Date(test.date.seconds * 1000).toLocaleDateString('en-US')}</Td>
      <Td>
        <Button
          color="white"
          bg={`${theme}.400`}
          onClick={() => {
            setToggleChart(true)
            setTestId(test.testId)
          }}
        >
          view chart
        </Button>
      </Td>
    </Tr>
  ))

  return (
    <>
      <Flex flexDir="column" justify="center" h="100%">
        <Flex w="100%" justify="flex-end">
          <TableFilters tableFilter={filter} toggleFilter={toggleFilter} />
        </Flex>

        {!loading && tableRows ? (
          <Table
            size={breakpoint === 'base' || breakpoint === 'sm' ? 'sm' : 'lg'}
            variant="simple"
            color={`${theme}.200`}
          >
            <TableCaption textAlign="left" p={0} placement="top" mb="2" color={`${theme}.text`}>
              Recent Typing Tests
            </TableCaption>
            <TableHeads />
            <Tbody>{tableRows}</Tbody>
          </Table>
        ) : (
          <Spinner size="xl" mt="40" />
        )}
      </Flex>
      <Modal isOpen={toggleChart} onClose={() => setToggleChart(false)} size="5xl" isCentered>
        <ModalContent bg={`${theme}.100`} border={`1px solid gray`}>
          <ModalCloseButton _focus={{ border: 'none' }} color={`${theme}.textLight`} />
          <ModalHeader color={`${theme}.textLight`}>Recap</ModalHeader>
          <ModalBody p="5em">
            <ResultsChart testId={testId} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TypingTestsTable
