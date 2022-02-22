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
  Tooltip,
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
                Color
              </FormLabel>
              <Input
                appearance="none"
                name="color"
                bgColor={'inherit' || caretSettings.color}
                type="color"
                border="none"
                value={caretSettings.color}
                onChange={e => setCaretSettings({ ...caretSettings, color: e.target.value })}
              />
            </FormControl>
            <Tooltip label="Sets how fluid the caret appears. Slightly delays caret position" placement="end">
              <FormControl>
                <FormLabel fontSize="sm" htmlFor="color">
                  Smoothness
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
            </Tooltip>

            <Tooltip label="Sets caret transparency" placement="end">
              <FormControl>
                <FormLabel fontSize="sm" htmlFor="color">
                  Opacity
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
            </Tooltip>
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
