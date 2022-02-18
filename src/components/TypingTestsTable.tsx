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
  Th,
  Thead,
  Tr,
  useBreakpoint,
} from '@chakra-ui/react'
import { getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Legend, Line, Tooltip } from 'recharts'
import { useAuth } from '../contexts/AuthContext'
import { testsRef } from '../firebase'
import { useToggle } from '../hooks/useToggle'
import { userAtom } from '../store/firebaseAtoms'
import { themeAtom } from '../store/typingTestAtoms'

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
}

function TypingTestsTable() {
  const [user] = useAtom(userAtom)

  const [tableData, setTableData] = useState<TypingTestData[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('date')
  const breakpoint = useBreakpoint()
  const [theme] = useAtom(themeAtom)

  const [recapData, setRecapData] = useState<
    {
      wpm: number
      seconds: number
      incorrect: number
    }[]
  >([])

  const [toggleChart, setToggleChart] = useToggle(false)

  const toggleFilter = (filter: string) => {
    setFilter(filter)
    console.log(tableData)
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
      <Td>{test.seconds}s</Td>
      <Td>{test.wpm}</Td>
      <Td>{test.accuracy}%</Td>
      <Td>{new Date(test.date.seconds * 1000).toLocaleDateString('en-US')}</Td>
      <Td>
        <Button
          onClick={() => {
            setToggleChart(true)
            setRecapData(test.recap)
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
          <Table
            size={breakpoint === 'base' || breakpoint === 'sm' ? 'sm' : 'lg'}
            variant="simple"
            color={`${theme}.300`}
          >
            <TableCaption textAlign="left" p={0} placement="top" mb="2">
              Recent Typing Tests
            </TableCaption>
            <Thead>
              <Tr>
                <Th>time</Th>
                <Th>wpm</Th>
                <Th>accuracy</Th>
                <Th>date</Th>
                <Th>recap</Th>
              </Tr>
            </Thead>
            <Tbody>{tableRows}</Tbody>
          </Table>
        ) : (
          <Spinner size="xl" mt="40" />
        )}
      </Flex>
      <Modal isOpen={toggleChart} onClose={() => setToggleChart(false)} size="5xl" isCentered>
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p="5em">
            <ResponsiveContainer width="100%" height={300} maxHeight={300}>
              <LineChart data={recapData}>
                <CartesianGrid stroke={`${[theme][200]}`} strokeDasharray="3, 3" />
                <XAxis dataKey="seconds" />
                <YAxis dataKey="wpm" yAxisId="left" />
                <YAxis dataKey="incorrect" yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line type="monotone" yAxisId="left" dataKey="wpm" fill={`${[theme][200]}`} />
                <Line yAxisId="right" type="monotone" dataKey="incorrect" stroke={`${theme}.200`} />
              </LineChart>
            </ResponsiveContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TypingTestsTable
