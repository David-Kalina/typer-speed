import { Box, Flex, FormControl, FormLabel, Icon, Input, Text, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import React from 'react'
import { IoMdColorPalette } from 'react-icons/io'
import { fontFamilyAtom, setThemesAtom, themeAtom, themesAtom } from '../../store/themeAtoms'

function ThemeBody() {
  const [theme] = useAtom(themeAtom)
  const [font] = useAtom(fontFamilyAtom)
  const setTheme = useUpdateAtom(setThemesAtom)
  const [themes] = useAtom(themesAtom)

  const renderThemes = Object.entries(themes).map(([key, value]) => {
    return (
      <Flex cursor="pointer" key={key} align="center" onClick={() => setTheme({ name: key, value })}>
        <Icon as={IoMdColorPalette} size="1.5em" color={theme.name === value.name ? theme.correct : 'unset'} />
        <Text ml="6px" fontSize="lg" fontFamily={font}>
          {value.name}
        </Text>
      </Flex>
    )
  })

  const themeOptions = Object.keys(theme) as Array<keyof typeof theme>

  const renderCustomThemeOptions = themeOptions.map(key => (
    <FormControl key={key} isDisabled={theme.name !== 'Custom'}>
      <FormLabel htmlFor="font-family">{key}</FormLabel>
      <Input
        id={key}
        name={key}
        value={theme[key]}
        type="color"
        onChange={e => {
          // TODO debounce this
          setTheme({ name: 'custom', value: { ...theme, [key]: e.target.value } })
        }}
      />
    </FormControl>
  ))

  return (
    <>
      <Flex h="300px">
        <Box flex={2} h="inherit">
          <Text fontWeight="bold">Themes</Text>
          <VStack mt="2" align="stretch" overflowY="scroll" overflowX="hidden" h="90%" pr="3">
            {renderThemes}
          </VStack>
        </Box>
        <Box flex={1} />
        <Box flex={2} h="inherit">
          <Text fontWeight="bold"> {theme.name} colors</Text>
          <VStack mt="2" align="stretch" overflowY="scroll" overflowX="hidden" h="90%" pr="3">
            {renderCustomThemeOptions}
          </VStack>
        </Box>
      </Flex>
    </>
  )
}

export default ThemeBody
