import { Flex } from '@chakra-ui/react'
import React from 'react'
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer, Label } from 'recharts'

const fakeData = [
  {
    time: 0,
    wpm: 0,
    errors: 0,
  },
  {
    time: 1,
    wpm: 10,
    errors: 0,
  },
  {
    time: 2,
    wpm: 30,
    errors: 5,
  },
  {
    time: 3,
    wpm: 30,
    errors: 2,
  },
  {
    time: 4,
    wpm: 40,
    errors: 8,
  },
  {
    time: 5,
    wpm: 50,
    errors: 10,
  },
]

function Index() {
  return (
    <ResponsiveContainer width="100%" height={300} maxHeight={300}>
      <LineChart data={fakeData}>
        <XAxis dataKey="time" />
        <YAxis
          color="white"
          dataKey="wpm"
          label={{ value: 'Words per minute', angle: -90, position: 'center', fill: 'white' }}
        ></YAxis>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="wpm" stroke="green" animationDuration={5000} />
        <Line type="monotone" dataKey="errors" stroke="red" animationDuration={5000} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Index
