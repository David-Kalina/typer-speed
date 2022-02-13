import { Box } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { Character } from '../../types'

function Index({ value, id, className }: Character) {
  const [newClassName, setNewClassName] = useState(className)

  return (
    <Box
      display="inline-block"
      lineHeight="1em"
      borderBottom=".05em solid transparent"
      className={newClassName || className}
      boxSizing="border-box"
    >
      {value}
    </Box>
  )
}

Index.displayName = 'Character'

export default Index
