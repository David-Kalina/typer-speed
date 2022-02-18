import { Button, ModalBody, SimpleGrid, Stack, useTheme } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { themeAtom } from '../../store/typingTestAtoms'

function ThemeBody() {
  const [theme, setTheme] = useAtom(themeAtom)

  const chakraUITheme = useTheme()

  console.log(chakraUITheme['colors'][theme]['gradient'])
  return (
    <ModalBody minH="325px" pb="16" fontSize="sm">
      <SimpleGrid minChildWidth="100px" color="white" fontWeight="bold">
        <Button
          bgGradient={chakraUITheme['colors']['mountainHaze']['gradient']}
          m="0.45em"
          onClick={() => setTheme('mountainHaze')}
        >
          Mount Haze
        </Button>
        <Button
          bgGradient={chakraUITheme['colors']['morningEspresso']['gradient']}
          m="0.45em"
          onClick={() => setTheme('morningEspresso')}
        >
          Morning Espresso
        </Button>
        <Button
          bgGradient={chakraUITheme['colors']['warmSunset']['gradient']}
          m="0.45em"
          onClick={() => setTheme('warmSunset')}
        >
          Warm Sunset
        </Button>
        <Button
          bgGradient={chakraUITheme['colors']['crackOfDawn']['gradient']}
          m="0.45em"
          onClick={() => setTheme('crackOfDawn')}
        >
          Crack of Dawn
        </Button>
        <Button
          bgGradient={chakraUITheme['colors']['steelFramework']['gradient']}
          m="0.45em"
          onClick={() => setTheme('steelFramework')}
        >
          Steel Framework
        </Button>
      </SimpleGrid>
    </ModalBody>
  )
}

export default ThemeBody
