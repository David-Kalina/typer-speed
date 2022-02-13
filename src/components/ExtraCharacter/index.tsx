import { Box } from '@chakra-ui/react'
import { useUpdateAtom } from 'jotai/utils'
import React, { useRef } from 'react'
import { copyCurrentExtraCharacterElementAtom, currentExtraCharacterElementAtom } from '../../store'
import { Character } from '../../types'

const Index = React.memo(({ value }: Character) => {
  const ref = useRef<HTMLDivElement>(null)
  const setCurrentExtraCharacter = useUpdateAtom(currentExtraCharacterElementAtom)
  const setCopyCurrentExtraCharacter = useUpdateAtom(copyCurrentExtraCharacterElementAtom)

  React.useEffect(() => {
    if (ref.current) setCurrentExtraCharacter(ref.current)
  }, [setCurrentExtraCharacter])

  React.useEffect(() => {
    if (ref.current) setCopyCurrentExtraCharacter(ref.current)
  }, [setCopyCurrentExtraCharacter, setCurrentExtraCharacter])

  return (
    <Box ref={ref} display="inline-block" lineHeight="1em" borderBottom=".05em solid transparent" className="extra">
      {value}
    </Box>
  )
})

Index.displayName = 'ExtraCharacter'

export default Index
