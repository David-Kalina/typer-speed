import { Box } from '@chakra-ui/react'
import React from 'react'
import { Character } from '../../types'

function Index({ value }: Character) {
  

  return (
    <Box display="inline-block" lineHeight="32px" borderBottom="1px solid red">
      {value}
    </Box>
  )
}

export default Index
