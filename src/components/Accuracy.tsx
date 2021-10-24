import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import * as React from 'react'
import { socket } from '../contexts/SocketContext'

interface AccuracyProps {}

const Accuracy: React.FC<AccuracyProps> = () => {
  const [accuracy, setAccuracy] = React.useState(0)

  React.useEffect(() => {
    socket.on('accuracy', accuracy => setAccuracy(accuracy))
  }, [])

  React.useEffect(() => {
    socket.on('resetAccuracy', () => setAccuracy(0))
  }, [])

  const determineColor = React.useCallback(accuracy => {
    if (accuracy <= 10) {
      return '#ff6700'
    } else if (accuracy <= 30 && accuracy > 10) {
      return '#ff7f00'
    } else if (accuracy < 50 && accuracy > 30) {
      return '#ffab00'
    } else if (accuracy < 70 && accuracy > 40) {
      return '#fed93f'
    } else {
      return 'green.200'
    }
  }, [])

  return (
    <CircularProgress value={accuracy} color={determineColor(accuracy)} size={20}>
      <CircularProgressLabel fontSize="lg">{accuracy}%</CircularProgressLabel>
    </CircularProgress>
  )
}

export default Accuracy
