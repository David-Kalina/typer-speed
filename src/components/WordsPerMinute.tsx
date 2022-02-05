import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { socket } from '../contexts/SocketContext'
import * as React from 'react'

const WordsPerMinute: React.FC = () => {
  const [wpm, setWpm] = React.useState(0)

  React.useEffect(() => {
    socket.on('wpm', wpm => setWpm(wpm))
  }, [])

  React.useEffect(() => {
    socket.on('resetWPM', () => setWpm(0))
  }, [])

  const determineColor = React.useCallback(wpm => {
    if (wpm <= 10) {
      return '#ff6700'
    } else if (wpm <= 30 && wpm > 10) {
      return '#ff7f00'
    } else if (wpm < 50 && wpm > 30) {
      return '#ffab00'
    } else if (wpm < 70 && wpm > 40) {
      return '#fed93f'
    } else {
      return 'green.200'
    }
  }, [])

  return (
    <CircularProgress value={wpm} color={determineColor(wpm)} size={20}>
      <CircularProgressLabel fontSize="lg">{wpm}</CircularProgressLabel>
    </CircularProgress>
  )
}

export default WordsPerMinute
