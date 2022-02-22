import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { loopTimeAtom } from '../../store/gameAtoms'
import { themeAtom } from '../../store/themeAtoms'

function ZenBody() {
  const [speed, setSpeed] = useAtom(loopTimeAtom)
  const [theme] = useAtom(themeAtom)

  return (
    <>
      <Flex h="300px">
        <Box flex={1} h="inherit">
          <Text>Themes</Text>
          <VStack mt="2" align="stretch" overflowY="scroll" overflowX="hidden" h="90%" pr="3">
            <FormControl>
              <FormLabel fontSize="sm" htmlFor="color">
                speed
              </FormLabel>
              <Slider
                isReversed
                step={10}
                onChange={(val: number) => setSpeed(val)}
                max={1000}
                min={0}
                defaultValue={300}
                name="delay"
              >
                <SliderTrack bg={theme.default}>
                  <SliderFilledTrack bg={theme.correct} />
                </SliderTrack>
                <SliderThumb borderRadius="sm" />
              </Slider>
            </FormControl>
          </VStack>
        </Box>
      </Flex>
    </>
  )
}

export default ZenBody
