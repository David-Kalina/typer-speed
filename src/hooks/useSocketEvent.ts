import { useEffect, useMemo, useState } from 'react'
import { socket } from '../contexts/SocketContext'

export const useSocketEvent = (
  eventName: string,
  eventHandler: (data: any) => void
) => {
  const [event] = useState<any>(null)

  useEffect(() => {
    socket.on(eventName, eventHandler)

    return () => {
      socket.off(eventName, eventHandler)
    }
  }, [eventName, eventHandler])

  return useMemo(() => event, [event])
}

export const useEmitSocketEvent = (eventName: string, eventData?: any) => {
  useEffect(() => {
    console.log('useSocketEvent', eventName)

    socket.emit(eventName, eventData)
  }, [eventName, eventData])
}
