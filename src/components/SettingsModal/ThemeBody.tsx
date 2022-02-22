import { Button, SimpleGrid } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import React from 'react'
import { setThemesAtom, themeAtom, themesAtom } from '../../store/themeAtoms'

function ThemeBody() {
  const [theme] = useAtom(themeAtom)
  const setTheme = useUpdateAtom(setThemesAtom)
  const [themes] = useAtom(themesAtom)

  const renderThemes = Object.entries(themes).map(([key, value]) => {
    return (
      <Button bg={`${theme}.300`} key={key} m="0.45em">
        {value.name}
      </Button>
    )
  })

  return (
    <>
      <SimpleGrid minChildWidth="200px" h="300px" columns={3}>
        {renderThemes}
      </SimpleGrid>
    </>
  )
}

export default ThemeBody
