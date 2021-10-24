import { useEffect, useMemo, useState } from 'react'
import { socket } from '../contexts/SocketContext'

export const useSocketEvents = (
  events: { name: string; callback: (...args: any[]) => void; disconnect: boolean }[]
) => {
  const [socketEvents, setSocketEvents] = useState(useMemo(() => events, [events]))

  useEffect(() => {
    for (const { name, callback, disconnect } of socketEvents) {
      socket.on(name, (...args: any) => callback(args))
      if (!disconnect) {
        return () => {
          socket.off(name)
        }
      }
    }
  }, [socketEvents])
}

export const useSocketEvent = (event: string, callback: (...args: any[]) => void) => {
  useEffect(() => {
    socket.on(event, (...args) => callback(args))
    return () => {
      socket.off(event)
    }
  }, [callback, event])
}
