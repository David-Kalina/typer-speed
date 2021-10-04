import React from 'react'
import { io, Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io-client/build/typed-events'

export const socket = io('http://localhost:4000')
export const SocketContext = React.createContext<Socket<DefaultEventsMap, DefaultEventsMap> | null>(
  null
)
