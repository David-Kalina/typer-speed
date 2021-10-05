import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import * as React from 'react'
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { socket } from '../contexts/SocketContext'
import StarTest from './NewTest'

interface StatChartProps {}

const StatChart: React.FC<StatChartProps> = () => {
  const [data, setData] = React.useState([])
  const [showData, setShowData] = React.useState(false)

  React.useEffect(() => {
    socket.on('sendData', data => setData(data))
  }, [])

  React.useEffect(() => {
    socket.on('showData', () => setShowData(true))
  }, [])

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
            <Line type="monotone" dataKey="wpm" stroke="#82ca9d" animationDuration={10000} />
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
            New Test
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default StatChart
