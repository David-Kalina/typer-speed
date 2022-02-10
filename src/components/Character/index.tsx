import { Box } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { socketAtom } from '../../store'
import { Character } from '../../types'

function Index({ value, id, className }: Character) {
  const [socket] = useAtom(socketAtom)
  const [newClassName, setNewClassName] = useState(className)

  React.useEffect(() => {
    socket.on(`${id}`, className => setNewClassName(className))
  }, [])

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

export default Index
