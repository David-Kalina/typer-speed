import React from 'react'
import { io, Socket } from 'socket.io-client'

export const socket = io(process.env.REACT_APP_SOCKET_SERVER as string)
export const SocketContext = React.createContext<Socket | null>(null)
