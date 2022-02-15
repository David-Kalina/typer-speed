import { Box } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { useEffect, useRef } from 'react'
import { currentExtraCharacterElementAtom } from '../../store'
import { Character } from '../../types'

const Index = React.memo(({ value }: Character) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [, setCurrentExtraCharacterElement] = useAtom(currentExtraCharacterElementAtom)

  useEffect(() => {
    const { current } = ref
    if (current) setCurrentExtraCharacterElement(current)
  }, [setCurrentExtraCharacterElement])

  return (
    <Box ref={ref} display="inline-block" lineHeight="1em" borderBottom=".05em solid transparent" className="extra">
      {value}
    </Box>
  )
})

Index.displayName = 'ExtraCharacter'

export default Index
