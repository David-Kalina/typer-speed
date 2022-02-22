import { Box, Flex, FormControl, FormLabel, Icon, Input, Text, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import React from 'react'
import { FaFont } from 'react-icons/fa'
import { characterOptions, fonts, fontSizes } from '../../constants/fonts'
import { fontFamilyAtom, fontSizeAtom, setThemesAtom, themeAtom } from '../../store/themeAtoms'

function FontBody() {
  const [fontSize, setFontSize] = useAtom(fontSizeAtom)
  const [fontFamily, setFontFamily] = useAtom(fontFamilyAtom)
  const setTheme = useUpdateAtom(setThemesAtom)
  const [theme] = useAtom(themeAtom)

  const renderFonts = Object.values(fonts).map(font => (
    <Flex cursor="pointer" key={font} align="center" onClick={() => setFontFamily(font)}>
      <Icon as={FaFont} size="1.5em" color={fontFamily === font ? 'orange' : 'unset'} />
      <Text ml="6px" fontSize="lg" fontFamily={font}>
        {font}
      </Text>
    </Flex>
  ))

  const renderFontSizes = Object.entries(fontSizes).map(([size, text]) => (
    <Flex cursor="pointer" key={text} align="center" flex={1} onClick={() => setFontSize(Number(size))}>
      <Icon as={FaFont} color={Number(size) === fontSize ? 'orange' : 'unset'} />
      <Text ml="0.5rem">{text}</Text>
    </Flex>
  ))

  const renderCharacterOptions = Object.entries(characterOptions).map(([key, { name, type, label }]) => (
    <FormControl key={key}>
      <FormLabel htmlFor="font-family">{label}</FormLabel>
      <Input
        id={name}
        name={name}
        defaultValue={theme[name]}
        type={type}
        onChange={e => {
          setTheme({ name: 'custom', value: { ...theme, [name]: e.target.value } })
        }}
      />
    </FormControl>
  ))

  return (
    <>
      <Flex h="300px">
        <Box flex={2} h="inherit">
          <Text>Color & Size</Text>
          <VStack mt="2" align="stretch" overflowY="scroll" overflowX="hidden" h="90%" pr="3">
            {renderFontSizes}
            {renderCharacterOptions}
          </VStack>
        </Box>
        <Box flex={1} />
        <Box flex={2} h="inherit">
          <Text>Font Family</Text>
          <VStack mt="2" align="stretch" overflowY="scroll" overflowX="hidden" h="90%" pr="3">
            {renderFonts}
          </VStack>
        </Box>
      </Flex>
    </>
  )
}

export default FontBody
