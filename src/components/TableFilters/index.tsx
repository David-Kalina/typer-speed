import { Button, HStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'

import { personalFilters } from '../../customization/filters'
import { themeAtom } from '../../store/themeAtoms'

interface TableFiltersProps {
  toggleFilter: (filter: string) => void
  tableFilter: string
}

function Index({ toggleFilter, tableFilter }: TableFiltersProps) {
  const [theme] = useAtom(themeAtom)
  const renderFilters = Object.values(personalFilters).map(filter => {
    return (
      <Button
        key={filter}
        fontSize="sm"
        size="sm"
        _focus={{ border: 'none' }}
        onClick={() => toggleFilter(filter)}
        borderLeftRadius="none"
        borderRightRadius="none"
        color={filter !== tableFilter ? `${theme.textLight}` : `${theme.textDark}`}
        bg={filter !== tableFilter ? `${theme.buttonLight}` : `${theme.buttonDark}`}
      >
        {filter}
      </Button>
    )
  })

  return <HStack>{renderFilters}</HStack>
}

export default Index
