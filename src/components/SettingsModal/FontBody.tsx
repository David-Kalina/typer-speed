import { Box, Button, Flex, HStack, Icon, IconButton, Text, useTheme, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { fontFamilyAtom, fontSizeAtom, themeAtom } from '../../store/typingTestAtoms'
import { fonts, fontSizes } from '../../constants/fonts'
import { FaFont, FaStar } from 'react-icons/fa'

function FontBody() {
  const [fontSize, setFontSize] = useAtom(fontSizeAtom)

  const [fontFamily, setFontFamily] = useAtom(fontFamilyAtom)

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

  return (
    <>
      <Flex h="300px">
        <Box flex={1}>
          <Text>Font Size</Text>
          <VStack mt="2" align="stretch" pr="3">
            {renderFontSizes}
          </VStack>
        </Box>
        <Box flex={1} h="inherit">
          <Text>Font Family</Text>
          <VStack mt="2" align="stretch" overflow="scroll" h="90%" pr="3">
            {renderFonts}
          </VStack>
        </Box>
      </Flex>
    </>
  )
}

export default FontBody
