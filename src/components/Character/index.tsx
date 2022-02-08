import { Box } from '@chakra-ui/react'
import React from 'react'
import { Character } from '../../types'

function Index({ value }: Character) {
  

  return (
    <Box display="inline-block" lineHeight="1em" borderBottom=".05em solid transparent">
      {value}
    </Box>
  )
}

export default Index
