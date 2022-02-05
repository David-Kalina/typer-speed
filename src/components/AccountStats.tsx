import { Box, HStack, Text } from '@chakra-ui/react'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase'

interface AccountStatData {
  email: string
  averageWPM: number
  averageAccuracy: number
  testsTaken: number
  testsCompleted: number
  timeTyping: number
}

function AccountStats() {
  const { user } = useAuth()

  const [statData, setStatData] = useState<AccountStatData>({
    email: '',
    averageWPM: 0,
    averageAccuracy: 0,
    testsTaken: 0,
    testsCompleted: 0,
    timeTyping: 0,
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const statRef = doc(db, 'stats', user?.email as string)

    getDoc(statRef)
      .then(snapshot => {
        setStatData(snapshot.data() as AccountStatData)
      })
      .then(() => setLoading(false))
  }, [user?.email])

  return (
    <HStack justify="space-between" w="100%">
      {!loading && statData ? (
        <>
          <Box>
            <Text>tests taken</Text>
            <Text fontSize="5xl">{statData.testsTaken}</Text>
          </Box>
          <Box>
            <Text>tests completed</Text>
            <Text fontSize="5xl">{statData.testsCompleted}</Text>
          </Box>
          <Box>
            <Text>time typing</Text>
            <Text fontSize="5xl">{statData.timeTyping}s</Text>
          </Box>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
      )
    </HStack>
  )
}

export default AccountStats
