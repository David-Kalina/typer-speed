import { Th, Thead, Tr } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'

import { tableHeads } from '../../constants/tableHeads'
import { themeAtom } from '../../store/typingTestAtoms'

function Index() {
  const [theme] = useAtom(themeAtom)

  const renderTableHeads = Object.values(tableHeads).map(tableHead => (
    <Th key={tableHead} color={`${theme}.text`}>
      {tableHead}
    </Th>
  ))

  return (
    <Thead>
      <Tr>{renderTableHeads}</Tr>
    </Thead>
  )
}

export default Index