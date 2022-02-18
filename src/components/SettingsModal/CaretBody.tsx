import {
  ModalBody,
  Flex,
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  color,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import SettingsCaret from '../SettingsCaret'

function CaretBody() {
  const [color, setColor] = useState('#000000')
  const [delay, setDelay] = useState(0)
  const [height, setHeight] = useState(4)
  const [width, setWidth] = useState(6)
  const [opacity, setOpacity] = useState(1)

  return (
    <ModalBody minH="325px" pb="16" fontSize="sm">
      <Flex h="325px">
        <Box flex={1}>
          <Stack fontSize="xs">
            <FormControl id="color">
              <FormLabel htmlFor="color">color</FormLabel>
              <Input name="color" type="color" onChange={e => setColor(e.target.value)} />
            </FormControl>
            <FormControl id="height">
              <FormLabel htmlFor="height">height</FormLabel>
              <Slider
                step={0.1}
                onChange={(val: number) => setHeight(val)}
                max={10}
                min={1}
                defaultValue={4}
                name="height"
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>
            <FormControl id="width">
              <FormLabel htmlFor="width">width</FormLabel>
              <Slider
                step={0.1}
                onChange={(val: number) => setWidth(val)}
                max={30}
                min={1}
                defaultValue={6}
                name="width"
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>
            <FormControl id="opacity">
              <FormLabel htmlFor="opacity">opacity</FormLabel>
              <Slider
                step={0.1}
                onChange={(val: number) => setOpacity(val)}
                max={1}
                min={0}
                defaultValue={1}
                name="width"
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>
          </Stack>
        </Box>
        <Box flex={1} />
        <Flex align="center" justify="center" flex={1} borderRadius="md" border="2px solid white">
          <SettingsCaret color={color} delay={delay} height={height} width={width} opacity={opacity} />
        </Flex>
      </Flex>
    </ModalBody>
  )
}

export default CaretBody
