import React, { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const TimeContext = createContext(null as any)

export const useTime = () => useContext(TimeContext)

export const TimeProvider = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  const [time, setTime] = useLocalStorage('time', 30)

  return <TimeContext.Provider value={[time, setTime]}>{children}</TimeContext.Provider>
}

export default TimeContext
