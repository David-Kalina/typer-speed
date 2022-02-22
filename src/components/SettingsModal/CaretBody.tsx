import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
} from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { caretSettingsAtom } from '../../store/caretAtoms'
import { themeAtom } from '../../store/themeAtoms'
import SettingsCaret from '../SettingsCaret'

function CaretBody() {
  const [caretSettings, setCaretSettings] = useAtom(caretSettingsAtom)
  const [theme] = useAtom(themeAtom)

  return (
    <>
      <Flex h="300px">
        <Box flex={1}>
          <Stack fontSize="xs">
            <FormControl id="color">
              <FormLabel fontSize="sm" htmlFor="color">
                color
              </FormLabel>
              <Input
                appearance="none"
                name="color"
                bgColor={'inherit' || caretSettings.color}
                type="color"
                border="none"
                defaultValue={'white' || caretSettings.color}
                onChange={e => setCaretSettings({ ...caretSettings, color: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm" htmlFor="color">
                smoothness
              </FormLabel>
              <Slider
                step={0.1}
                onChange={(val: number) => setCaretSettings({ ...caretSettings, delay: val })}
                max={100}
                min={0}
                defaultValue={caretSettings.delay}
                name="delay"
              >
                <SliderTrack bg={theme.default}>
                  <SliderFilledTrack bg={theme.correct} />
                </SliderTrack>
                <SliderThumb borderRadius="sm" />
              </Slider>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm" htmlFor="color">
                opacity
              </FormLabel>
              <Slider
                step={0.1}
                onChange={(val: number) => setCaretSettings({ ...caretSettings, opacity: val })}
                max={1}
                min={0}
                defaultValue={caretSettings.opacity}
                name="width"
              >
                <SliderTrack bg={theme.default}>
                  <SliderFilledTrack bg={theme.correct} />
                </SliderTrack>
                <SliderThumb borderRadius="sm" />
              </Slider>
            </FormControl>
          </Stack>
        </Box>
        <Box flex={1} />
        <Flex align="center" justify="center" flex={2} border={`1px solid ${theme.textLight}`}>
          <SettingsCaret
            delay={caretSettings.delay}
            opacity={caretSettings.opacity}
            color={caretSettings.color}
            height={caretSettings.height}
            width={caretSettings.width}
          />
        </Flex>
      </Flex>
    </>
  )
}

export default CaretBody
