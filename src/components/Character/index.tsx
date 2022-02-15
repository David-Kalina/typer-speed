import { Box } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { Character } from '../../types'

const Index = React.memo(({ value, className }: Character) => {
  const ref = useRef<HTMLDivElement | null>(null)

  return (
    <Box
      ref={ref}
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
