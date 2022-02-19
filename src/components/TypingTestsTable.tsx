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
            color={filter !== `wpm` ? `black` : `${theme}.textLight`}
            bg={filter !== 'wpm' ? `${theme}.100` : `${theme}.300`}
          >
            WPM
          </Button>
          <Button
            fontSize="sm"
            _focus={{ border: 'none' }}
            onClick={() => toggleFilter('date')}
            borderLeftRadius="none"
            borderRightRadius="none"
            color={filter !== `date` ? `black` : `${theme}.textLight`}
            bg={filter !== 'date' ? `${theme}.300` : `${theme}.300`}
          >
            Date
          </Button>
          <Button
            fontSize="sm"
            _focus={{ border: 'none' }}
            onClick={() => toggleFilter('accuracy')}
            borderLeftRadius="none"
            color={filter !== `accuracy` ? `black` : `${theme}.textLight`}
            bg={filter !== 'accuracy' ? `${theme}.100` : `${theme}.300`}
          >
            Acc
          </Button>
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
            <Thead>
              <Tr>
                <Th color={`${theme}.text`}>time</Th>
                <Th color={`${theme}.text`}>wpm</Th>
                <Th color={`${theme}.text`}>accuracy</Th>
                <Th color={`${theme}.text`}>date</Th>
                <Th color={`${theme}.text`}>recap</Th>
              </Tr>
            </Thead>
            <Tbody>{tableRows}</Tbody>
          </Table>
        ) : (
          <Spinner size="xl" mt="40" />
        )}
      </Flex>
      <Modal isOpen={toggleChart} onClose={() => setToggleChart(false)} size="5xl" isCentered>
        <ModalContent bg={`${theme}.100`} border={`1px solid gray`}>
          <ModalCloseButton color={`${theme}.text`} />
          <ModalHeader color={`${theme}.text`}>Recap</ModalHeader>
          <ModalBody p="5em">
            <ResponsiveContainer width="100%" height={300} maxHeight={300}>
              <LineChart data={recapData}>
                <CartesianGrid stroke={`${[theme]}.text`} strokeDasharray="3, 3" />
                <XAxis dataKey="seconds" />
                <YAxis dataKey="wpm" yAxisId="left" />
                <YAxis dataKey="incorrect" yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line type="monotone" yAxisId="left" dataKey="wpm" fill={`${[theme]}.text`} />
                <Line yAxisId="right" type="monotone" dataKey="incorrect" stroke={`${theme}.text`} />
              </LineChart>
            </ResponsiveContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TypingTestsTable
