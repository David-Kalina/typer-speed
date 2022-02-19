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
import { themeAtom } from '../../store/typingTestAtoms'
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
                w="20px"
                h="20px"
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
                <SliderTrack bg={`${theme}.400`}>
                  <SliderFilledTrack bg={`${theme}.200`} />
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
                <SliderTrack bg={`${theme}.400`}>
                  <SliderFilledTrack bg={`${theme}.200`} />
                </SliderTrack>
                <SliderThumb borderRadius="sm" />
              </Slider>
            </FormControl>
          </Stack>
        </Box>
        <Box flex={1} />
        <Flex align="center" justify="center" flex={3} borderRadius="sm" border="2px solid white">
          <SettingsCaret
            color={caretSettings.color}
            height={caretSettings.height}
            width={caretSettings.width}
            opacity={caretSettings.opacity}
            delay={100}
          />
        </Flex>
      </Flex>
    </>
  )
}

export default CaretBody
