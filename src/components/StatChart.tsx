import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBreakpoint,
  Text,
  VStack,
} from '@chakra-ui/react'
import * as React from 'react'
import { VscDebugRestart } from 'react-icons/vsc'
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { socket } from '../contexts/SocketContext'
import { useSocketEvent } from '../hooks/useSocketEvent'

interface StatChartProps {}

const StatChart: React.FC<StatChartProps> = () => {
  const breakpoint = useBreakpoint()
  const [data, setData] = React.useState([])
  const [averageWPM, setAverageWPM] = React.useState(0)
  const [showData, setShowData] = React.useState(false)
  const [accuracy, setAccuracy] = React.useState(0)

  const preventDefault = React.useCallback(
    e => {
      if (e.code === 'Space' && showData) {
        e.preventDefault()
      }
    },
    [showData]
  )

  useSocketEvent('sendData', ({ overtime, averageWPM, accuracy }) => {
    setData(overtime)
    setAverageWPM(averageWPM)
    setAccuracy(accuracy)
  })

  useSocketEvent('showData', () => setShowData(true))

  if (showData) {
    window.addEventListener('keydown', e => preventDefault(e))
  } else {
    window.removeEventListener('keydown', e => preventDefault(e))
  }

  if (
    breakpoint === 'md' ||
    breakpoint === 'lg' ||
    breakpoint === 'xl' ||
    breakpoint === '2xl'
  ) {
    return (
      <Modal
        motionPreset="slideInBottom"
        onClose={() => setShowData(false)}
        isOpen={showData}
        size="4xl"
      >
        <ModalOverlay />
        <ModalContent pb={5}>
          <ModalHeader>Results</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LineChart width={730} height={250} data={data}>
              <XAxis dataKey="time" />
              <YAxis dataKey="wpm" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="wpm"
                stroke="#82ca9d"
                animationDuration={5000}
              />
            </LineChart>

            <VStack align="stretch">
              <Text>Average WPM: {averageWPM}</Text>
              <Text>Accuracy: {accuracy}%</Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              w="200px"
              onClick={() => {
                setData([])
                setShowData(false)
                socket.emit('init')
              }}
              mt="1rem"
              mx="auto"
            >
              <VscDebugRestart />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  } else {
    return (
      <Modal
        motionPreset="slideInBottom"
        onClose={() => setShowData(false)}
        isOpen={showData}
        size="full"
      >
        <ModalOverlay />
        <ModalContent pb={5}>
          <ModalHeader>Results</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LineChart width={300} height={300} data={data}>
              <XAxis dataKey="time" />
              <YAxis dataKey="wpm" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="wpm"
                stroke="#82ca9d"
                animationDuration={10000}
              />
            </LineChart>
          </ModalBody>
          <ModalFooter>
            <Button
              w="200px"
              onClick={() => {
                setData([])
                setShowData(false)
                socket.emit('init')
              }}
              mt="1rem"
              mx="auto"
            >
              <VscDebugRestart />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }
}

export default StatChart
