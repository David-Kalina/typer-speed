import { Box, Flex, Icon, Text, theme, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { FaFont } from 'react-icons/fa'
import { fonts, fontSizes } from '../../customization/fonts'
import { fontFamilyAtom, fontSizeAtom, themeAtom } from '../../store/themeAtoms'

function FontBody() {
  const [fontSize, setFontSize] = useAtom(fontSizeAtom)
  const [fontFamily, setFontFamily] = useAtom(fontFamilyAtom)
  const [theme] = useAtom(themeAtom)

  const renderFonts = Object.values(fonts).map(font => (
    <Flex cursor="pointer" key={font} align="center" onClick={() => setFontFamily(font)}>
      <Icon as={FaFont} size="1.5em" color={fontFamily === font ? theme.correct : 'unset'} />
      <Text ml="6px" fontSize="lg" fontFamily={font}>
        {font}
      </Text>
    </Flex>
  ))

  const renderFontSizes = Object.entries(fontSizes).map(([size, text]) => (
    <Flex cursor="pointer" key={text} align="center" onClick={() => setFontSize(Number(size))}>
      <Icon as={FaFont} color={Number(size) === fontSize ? theme.correct : 'unset'} />
      <Text ml="0.5rem">{text}</Text>
    </Flex>
  ))

  return (
    <>
      <Flex h="300px">
        <Box flex={2} h="inherit">
          <Text fontWeight="bold">Color & Size</Text>
          <VStack mt="2" align="stretch" overflowY="scroll" overflowX="hidden" h="90%" pr="3">
            {renderFontSizes}
          </VStack>
        </Box>
        <Box flex={1} />
        <Box flex={2} h="inherit">
          <Text fontWeight="bold">Font Family</Text>
          <VStack mt="2" align="stretch" overflowY="scroll" overflowX="hidden" h="90%" pr="3">
            {renderFonts}
          </VStack>
        </Box>
      </Flex>
    </>
  )
}

export default FontBody
