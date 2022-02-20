import { Box } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { Character } from '../../classes/Character'
import { themeAtom } from '../../store/typingTestAtoms'

const Index = React.memo(({ value, status }: Character) => {
  const [theme] = useAtom(themeAtom)

  return (
    <Box
      display="inline-block"
      color={`${theme}.${status}`}
      borderBottom={status === 'missed' ? `.05em solid darkred` : '.05em solid transparent'}
      lineHeight="1em"
      boxSizing="border-box"
    >
      {value}
    </Box>
  )
})

Index.displayName = 'Character'

export default Index
