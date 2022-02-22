import { Spinner, Table, TableCaption, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { getDocs, limit, orderBy, query } from 'firebase/firestore'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { testsRef } from '../../firebase'
import { themeAtom } from '../../store/themeAtoms'

function LeaderBoards() {
  const [loading, setLoading] = useState(true)
  const [theme] = useAtom(themeAtom)

  const [data, setData] = useState<any[]>([])

  const renderTableRows = data?.map((x, idx) => {
    return (
      <Tr key={idx}>
        <Td>{idx + 1}</Td>
        <Td>{x.email}</Td>
        <Td>{x.wpm}</Td>
        <Td>{x.seconds}</Td>
        <Td>{x.accuracy}%</Td>
        <Td>{new Date(x.date.seconds * 1000).toLocaleDateString('en-US')}</Td>
      </Tr>
    )
  })

  useEffect(() => {
    const q = query(testsRef, orderBy('wpm', 'desc'), limit(10))

    getDocs(q)
      .then(snapshot => {
        setLoading(true)
        setData(snapshot.docs.map(doc => doc.data()))
      })
      .then(() => setTimeout(() => setLoading(false), 300))
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <>
      {!loading ? (
        <Table color={theme.textLight} size="lg">
          <TableCaption placement="top" textAlign="left" fontSize="lg" color={theme.textLight}>
            Leaderboards
          </TableCaption>
          <Thead>
            <Th>Rank</Th>
            <Th>User</Th>
            <Th>WPM</Th>
            <Th>Time</Th>
            <Th>Accuracy</Th>
            <Th>Date</Th>
          </Thead>
          {renderTableRows}
        </Table>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default LeaderBoards
