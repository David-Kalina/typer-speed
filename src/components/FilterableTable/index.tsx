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
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { CollectionReference, DocumentData, limit, orderBy, query, where } from 'firebase/firestore'
import { useAtom } from 'jotai'
import React, { useCallback, useState } from 'react'
import { AiFillTrophy } from 'react-icons/ai'
import { useFetchDocs } from '../../hooks/useFetchDocs'
import { useToggle } from '../../hooks/useToggle'
import { userAtom } from '../../store/firebaseAtoms'
import { themeAtom } from '../../store/themeAtoms'
import ResultsChart from '../ResultsChart'

interface FilterableTableProps {
  filters: {
    [key: number | string]: string | number
  }
  headers: {
    [key: number | string]: string | number
  }
  caption: string
  documentReference: CollectionReference<DocumentData>
  target: 'seconds' | 'email'
  orderTarget: 'seconds' | 'wpm' | 'accuracy' | 'email' | 'date'
  orderStyle: 'desc' | 'asc'
  targetLimit: number
  competitive: boolean
  size: 'sm' | 'md' | 'lg'
  personal: boolean
}

function FilterableTable({
  filters,
  headers,
  caption,
  documentReference,
  target,
  orderStyle,
  orderTarget,
  targetLimit,
  competitive,
  personal,
  size = 'md',
}: FilterableTableProps) {
  const [theme] = useAtom(themeAtom)
  const [tableFilter, setTableFilter] = React.useState<any>(Object.values(filters)[0])
  const [toggle, setToggle] = useToggle(false)
  const [testId, setTestId] = useState('')
  const [user] = useAtom(userAtom)

  const q = personal
    ? query(documentReference, where('email', '==', user?.email), orderBy(tableFilter, orderStyle), limit(targetLimit))
    : query(documentReference, where(target, '==', tableFilter), orderBy(orderTarget, orderStyle), limit(targetLimit))

  const { data, loading } = useFetchDocs(q)

  const medal = useCallback((idx: number) => {
    if (idx + 1 === 1) return <Icon as={AiFillTrophy} w="6" h="6" color="goldenrod" borderRadius="full" />
    if (idx + 1 === 2) return <Icon as={AiFillTrophy} w="6" h="6" color="silver" borderRadius="full" />
    if (idx + 1 === 3) return <Icon as={AiFillTrophy} w="6" h="6" color="burlywood" borderRadius="full" />
    return <Text>{idx + 1}</Text>
  }, [])

  const renderTableHeads = Object.values(headers).map(header => (
    <Th fontSize={['xs', 'sm', 'md', 'lg']} key={header} color={`${theme}.text`}>
      {header}
    </Th>
  ))

  const renderTableFilters = Object.values(filters).map(filter => {
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

  const renderTableRows = data?.map((x: any, idx: number) => {
    return (
      <Tr key={idx}>
        <Td fontSize="lg">{competitive ? medal(idx) : idx}</Td>
        <Td fontSize="lg">{x.seconds}</Td>
        <Td fontSize="lg">{x.email}</Td>
        <Td fontSize="lg">{x.wpm}</Td>
        <Td fontSize="lg">{x.accuracy}%</Td>
        <Td fontSize="lg">{new Date(x.date.seconds * 1000).toLocaleDateString('en-US')}</Td>
        <Td>
          <Button
            fontSize={['xs', 'sm', 'md', 'lg']}
            color="white"
            bg={`${theme}.400`}
            onClick={() => {
              setToggle(true)
              setTestId(x.testId)
            }}
          >
            view chart
          </Button>
        </Td>
      </Tr>
    )
  })

  return (
    <Flex h="100%" minH="100vh" w="100%" flexDir="column" align="center">
      <Flex w="100%" justify="flex-end">
        {renderTableFilters}
      </Flex>
      {!loading ? (
        <>
          {!data.length ? (
            <Text color={theme.textLight}>No results...be the first?</Text>
          ) : (
            <>
              <Table color={theme.textLight} size={size}>
                <TableCaption textAlign="left" px="4" placement="top" mb="2" color={theme.textLight}>
                  {caption}
                </TableCaption>
                <Thead>
                  <Tr>{renderTableHeads}</Tr>
                </Thead>
                <Tbody>{renderTableRows}</Tbody>
              </Table>
            </>
          )}
        </>
      ) : (
        <Spinner size="xl" color={theme.textLight} />
      )}
      <Modal isOpen={toggle} onClose={() => setToggle(false)} size="5xl" isCentered>
        <ModalContent bg={theme.modal} border={`1px solid gray`}>
          <ModalCloseButton _focus={{ border: 'none' }} color={theme.textLight} />
          <ModalHeader color={theme.textLight}>Recap</ModalHeader>
          <ModalBody p="5em">
            <ResultsChart testId={testId} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default FilterableTable
