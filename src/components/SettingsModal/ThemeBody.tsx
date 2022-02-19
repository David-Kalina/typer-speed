import { Button, SimpleGrid } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { themes } from '../../constants/themes'
import { themeAtom } from '../../store/typingTestAtoms'

function ThemeBody() {
  const [theme, setTheme] = useAtom(themeAtom)

  const renderThemes = Object.entries(themes).map(([key, value]) => {
    return (
      <Button bg={`${theme}.300`} key={key} m="0.45em" onClick={() => setTheme(key)}>
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
