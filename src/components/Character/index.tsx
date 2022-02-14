import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Character } from '../../types'

const Index = React.memo(({ value, id, className }: Character) => {
  const [newClassName, setNewClassName] = useState('')

  return (
    <Box
      display="inline-block"
      lineHeight="1em"
      borderBottom=".05em solid transparent"
      className={className}
      boxSizing="border-box"
    >
      {value}
    </Box>
  )
})

Index.displayName = 'Character'

export default Index
