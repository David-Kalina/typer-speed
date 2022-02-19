import { Button, HStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'

import { filters } from '../../constants/filters'
import { themeAtom } from '../../store/typingTestAtoms'

interface TableFiltersProps {
  toggleFilter: (filter: string) => void
  tableFilter: string
}

function Index({ toggleFilter, tableFilter }: TableFiltersProps) {
  const [theme] = useAtom(themeAtom)
  const renderFilters = Object.values(filters).map(filter => {
    return (
      <Button
        key={filter}
        fontSize="sm"
        size="sm"
        _focus={{ border: 'none' }}
        onClick={() => toggleFilter(filter)}
        borderLeftRadius="none"
        borderRightRadius="none"
        color={filter !== tableFilter ? `textLight` : `${theme}.textDark`}
        bg={filter !== tableFilter ? `${theme}.100` : `${theme}.400`}
      >
        {filter}
      </Button>
    )
  })

  return <HStack>{renderFilters}</HStack>
}

export default Index
