import { Box } from '@chakra-ui/react'
import React from 'react'
import { Character } from '../../types'

const Index = React.memo(({ value }: Character) => {
  return (
    <Box display="inline-block" lineHeight="1em" borderBottom=".05em solid transparent" className="extra">
      {value}
    </Box>
  )
})

Index.displayName = 'ExtraCharacter'

export default Index
