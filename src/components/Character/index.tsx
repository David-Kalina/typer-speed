import { Box } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { Character } from '../../classes/Character'
import { themeAtom } from '../../store/typingTestAtoms'

const Index = React.memo(({ value, status }: Character) => {
  const [theme] = useAtom(themeAtom)

  console.log(status)
  return (
    <Box
      display="inline-block"
      color={`${theme}.${status}`}
      lineHeight="1em"
      borderBottom=".05em solid transparent"
      boxSizing="border-box"
    >
      {value}
    </Box>
  )
})

Index.displayName = 'Character'

export default Index
