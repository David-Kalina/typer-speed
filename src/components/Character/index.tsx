import { Box } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { socketAtom } from '../../store'
import { Character } from '../../types'

function Index({ value, id }: Character) {
  const [socket] = useAtom(socketAtom)
  const [className, setClassName] = useState('default')

  React.useEffect(() => {
    socket.on(`${id}`, className => setClassName(className))
  }, [])

  return (
    <Box display="inline-block" lineHeight="1em" borderBottom=".05em solid transparent" className={className}>
      {value}
    </Box>
  )
}

export default Index
