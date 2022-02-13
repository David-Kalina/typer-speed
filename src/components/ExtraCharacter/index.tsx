import { Box } from '@chakra-ui/react'
import { useUpdateAtom } from 'jotai/utils'
import React, { useRef } from 'react'
import { currentCharacterAtom } from '../../store'
import { Character } from '../../types'

const Index = React.memo(({ value }: Character) => {
  const setCurrentCharacter = useUpdateAtom(currentCharacterAtom)

  const ref = useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setCurrentCharacter(ref.current)
  }, [setCurrentCharacter])

  return (
    <Box ref={ref} display="inline-block" lineHeight="1em" borderBottom=".05em solid transparent" className="extra">
      {value}
    </Box>
  )
})

Index.displayName = 'ExtraCharacter'

export default Index
