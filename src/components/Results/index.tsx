import { addDoc, doc, increment, setDoc } from 'firebase/firestore'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useAuth } from '../../contexts/AuthContext'
import { db, testsRef } from '../../firebase'
import { socketAtom } from '../../store'

function Index() {
  const [socket] = useAtom(socketAtom)
  const { user } = useAuth()
  const [data, setData] = useState({
    recap: [],
    averageWPM: 0,
    accuracy: 0,
    testTime: 0,
    averageAccuracy: 0,
  })

  useEffect(() => {
    socket.on('data', ({ recap, averageWPM, averageAccuracy, accuracy, testTime }) => {
      setData({
        recap,
        averageWPM,
        accuracy,
        testTime,
        averageAccuracy,
      })

      if (user && user.email) {
        addDoc(testsRef, {
          email: user?.email,
          recap,
          wpm: averageWPM,
          accuracy: averageAccuracy,
          seconds: testTime,
          date: {
            seconds: Date.now() / 1000,
            nanoseconds: Date.now() / 1000000,
          },
        })
      }
      const statsRef = doc(db, 'stats', user?.email as string)

      setDoc(
        statsRef,
        {
          testsTaken: increment(1),
          testsCompleted: increment(1),
          timeTyping: increment(testTime),
        },
        { merge: true }
      )
    })

    return () => {
      socket.off('data')
    }
  }, [socket, data, user?.email, user])

  // useEffect(() => {
  //   console.log('hi')
  //   socket.emit('getData')
  //   return () => {
  //     socket.off('data')
  //   }
  // }, [socket])

  return (
    <>
      {data.recap.length > 0 ? (
        <ResponsiveContainer width="100%" height={300} maxHeight={300}>
          <LineChart data={data.recap}>
            <XAxis dataKey="time" />
            <YAxis dataKey="wpm" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="wpm" stroke="#82ca9d" animationDuration={5000} />
            <Line type="monotone" dataKey="errors" stroke="#8b0000" animationDuration={5000} />
          </LineChart>
        </ResponsiveContainer>
      ) : null}
    </>
  )
}

Index.displayName = 'TypingTest'

export default Index
