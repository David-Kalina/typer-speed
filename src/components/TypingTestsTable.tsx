import { Button, Flex, Spinner, Table, TableCaption, Tbody, Td, Th, Thead, Tr, useBreakpoint } from '@chakra-ui/react'
import { getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { colorMap } from '../constants/wpmColorMap'
import { useAuth } from '../contexts/AuthContext'
import { testsRef } from '../firebase'

interface TypingTestData {
  email: string
  wpm: number
  accuracy: number
  seconds: number
  date: {
    seconds: number
    nanoseconds: number
  }
}

function TypingTestsTable() {
  const { user } = useAuth()
  const [tableData, setTableData] = useState<TypingTestData[]>([])

  const [loading, setLoading] = useState(true)

  const [filter, setFilter] = useState('date')

  const breakpoint = useBreakpoint()

  const toggleFilter = (filter: string) => {
    setFilter(filter)
  }

  useEffect(() => {
    const q = query(testsRef, where('email', '==', user?.email), orderBy(filter), limit(10))

    getDocs(q)
      .then(snapshot => {
        console.log('snap')
        setLoading(true)
        setTableData(snapshot.docs.map(doc => doc.data()) as TypingTestData[])
      })
      .then(() => setLoading(false))
      .catch(err => console.error(err))
  }, [user?.email, filter])

  const tableRows = tableData?.map((test, idx) => (
    <Tr key={idx} fontWeight="bold">
      <Td>{test.seconds}s</Td>
      <Td color={colorMap(test.wpm)}>{test.wpm}</Td>
      <Td color={colorMap(test.accuracy)}>{test.accuracy}%</Td>
      <Td>{new Date(test.date.seconds * 1000).toLocaleDateString('en-US')}</Td>
    </Tr>
  ))

  return (
    <Flex flexDir="column" justify="center" h="100%">
      <Flex alignSelf="flex-end">
        <Button
          fontSize="sm"
          _focus={{ border: 'none' }}
          onClick={() => toggleFilter('wpm')}
          borderRightRadius="none"
          variant={filter !== 'wpm' ? 'ghost' : undefined}
        >
          WPM
        </Button>
        <Button
          fontSize="sm"
          _focus={{ border: 'none' }}
          onClick={() => toggleFilter('date')}
          borderLeftRadius="none"
          borderRightRadius="none"
          variant={filter !== 'date' ? 'ghost' : undefined}
        >
          Date
        </Button>
        <Button
          fontSize="sm"
          _focus={{ border: 'none' }}
          onClick={() => toggleFilter('accuracy')}
          borderLeftRadius="none"
          variant={filter !== 'accuracy' ? 'ghost' : undefined}
        >
          Acc
        </Button>
      </Flex>

      {!loading && tableRows ? (
        <Table variant="striped" size={breakpoint === 'base' || breakpoint === 'sm' ? 'sm' : 'lg'}>
          <TableCaption textAlign="left" p={0} placement="top" mb="2">
            Recent Typing Tests
          </TableCaption>
          <Thead>
            <Tr>
              <Th>time</Th>
              <Th>wpm</Th>
              <Th>accuracy</Th>
              <Th>date</Th>
            </Tr>
          </Thead>
          <Tbody>{tableRows}</Tbody>
        </Table>
      ) : (
        <Spinner size="xl" mt="40" />
      )}
    </Flex>
  )
}

export default TypingTestsTable
