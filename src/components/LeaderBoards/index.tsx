import {
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Spinner,
  Table,
  TableCaption,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { AiFillTrophy } from 'react-icons/ai'
import { leaderBoardFilters } from '../../customization/filters'
import { testsRef } from '../../firebase'
import { useToggle } from '../../hooks/useToggle'
import { themeAtom } from '../../store/themeAtoms'
import ResultsChart from '../ResultsChart'

function LeaderBoards() {
  const [loading, setLoading] = useState(true)
  const [theme] = useAtom(themeAtom)

  const [toggleChart, setToggleChart] = useToggle(false)
  const [testId, setTestId] = useState('')
  const [email, setEmail] = useState('')

  const [data, setData] = useState<any[]>([])

  const [tableFilter, setTableFilter] = useState(15)

  const renderTableRows = data?.map((x, idx) => {
    const medal = () => {
      if (idx + 1 === 1) return <Icon as={AiFillTrophy} w="6" h="6" color="goldenrod" borderRadius="full" />
      if (idx + 1 === 2) return <Icon as={AiFillTrophy} w="6" h="6" color="silver" borderRadius="full" />
      if (idx + 1 === 3) return <Icon as={AiFillTrophy} w="6" h="6" color="burlywood" borderRadius="full" />
      return <Text>{idx + 1}</Text>
    }

    return (
      <Tr key={idx}>
        <Td fontSize="lg">{medal()}</Td>
        <Td fontSize="lg">{x.email}</Td>
        <Td fontSize="lg">{x.wpm}</Td>
        <Td fontSize="lg">{x.seconds}</Td>
        <Td fontSize="lg">{x.accuracy}%</Td>
        <Td fontSize="lg">{new Date(x.date.seconds * 1000).toLocaleDateString('en-US')}</Td>
        <Td fontSize="lg">
          <Button
            fontSize={['xs', 'sm', 'md', 'lg']}
            color="white"
            bg={`${theme}.400`}
            onClick={() => {
              setToggleChart(true)
              setTestId(x.testId)
              setEmail(x.email)
            }}
          >
            view chart
          </Button>
        </Td>
      </Tr>
    )
  })

  const renderLeaderboardFilters = Object.values(leaderBoardFilters).map((filter, idx) => {
    return (
      <Button
        key={filter}
        fontSize="sm"
        size="sm"
        _focus={{ border: 'none' }}
        onClick={() => setTableFilter(filter)}
        borderLeftRadius="none"
        borderRightRadius="none"
        color={filter !== tableFilter ? `${theme.textLight}` : `${theme.textDark}`}
        bg={filter !== tableFilter ? `${theme.buttonLight}` : `${theme.buttonDark}`}
      >
        {filter}
      </Button>
    )
  })

  useEffect(() => {
    const q = query(testsRef, where('seconds', '==', tableFilter), orderBy('wpm', 'desc'), limit(10))

    getDocs(q)
      .then(snapshot => {
        setLoading(true)
        setData(snapshot.docs.map(doc => doc.data()))
      })
      .then(() => setTimeout(() => setLoading(false), 300))
      .catch(err => console.error(err))
  }, [tableFilter])

  return (
    <>
      {!loading ? (
        <>
          <Flex flexDir="column" justify="center" h="100%" w="100%" color={theme.textLight}>
            <Flex w="100%" justify="flex-end">
              {renderLeaderboardFilters}
            </Flex>
          </Flex>
          {!data.length ? (
            <Text h="400px" color={theme.textLight}>
              No results...be the first?
            </Text>
          ) : (
            <Table color={theme.textLight} size="lg" mb="auto">
              <TableCaption placement="top" textAlign="left" fontSize="lg" color={theme.textLight}>
                Leaderboards
              </TableCaption>
              <Thead>
                <Th color={theme.textLight}>Rank</Th>
                <Th color={theme.textLight}>User</Th>
                <Th color={theme.textLight}>WPM</Th>
                <Th color={theme.textLight}>Time</Th>
                <Th color={theme.textLight}>Accuracy</Th>
                <Th color={theme.textLight}>Date</Th>
                <Th color={theme.textLight}>Recap</Th>
              </Thead>
              {renderTableRows}
            </Table>
          )}
        </>
      ) : (
        <Spinner />
      )}
      <Modal isOpen={toggleChart} onClose={() => setToggleChart(false)} size="5xl" isCentered>
        <ModalContent bg={theme.modal} border={`1px solid gray`} h="530px">
          <ModalCloseButton _focus={{ border: 'none' }} color={theme.textLight} />
          <ModalHeader color={theme.textLight}>{email}`s Recap</ModalHeader>
          <ModalBody p="5em">
            <ResultsChart testId={testId} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LeaderBoards
