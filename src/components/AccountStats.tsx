import { Box, Stack, Text } from '@chakra-ui/react'
import { doc, getDoc } from 'firebase/firestore'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { accountStats } from '../constants/accountStats'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase'
import { themeAtom } from '../store/themeAtoms'

function AccountStats() {
  const { user } = useAuth()
  const [theme] = useAtom(themeAtom)
  const [statData, setStatData] = useState<any>({
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
        setStatData(snapshot.data())
      })
      .then(() => setLoading(false))
  }, [user?.email])

  const renderStats = Object.values(accountStats).map(({ key, name }) => (
    <Box key={key}>
      <Text>{name}</Text>
      <Text fontSize={['5xl']}>{statData[key]}</Text>
    </Box>
  ))

  return (
    <Stack
      justify="space-between"
      direction={['column', 'row']}
      w={['80%', '80%', '100%']}
      wrap="wrap"
      color={`${theme}.textLight`}
    >
      {!loading && statData ? <>{renderStats}</> : <Text>Loading...</Text>})
    </Stack>
  )
}

export default AccountStats
