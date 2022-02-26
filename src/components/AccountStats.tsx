import { Box, Stack, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Text } from '@chakra-ui/react'
import { doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { accountStats } from '../customization/accountStats'
import { useAuth } from '../contexts/AuthContext'
import { db, testsRef } from '../firebase'
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
    startingWPM: 0,
    currentWPM: 0,
    keyStrokes: 0,
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

  useEffect(() => {
    const newestTest = query(testsRef, where('email', '==', user?.email), orderBy('date', 'desc'), limit(1))

    getDocs(newestTest)
      .then(snapshot => {
        setLoading(true)
        setStatData((prev: any) => ({
          ...prev,
          currentWPM: snapshot.docs[0]?.data().wpm,
        }))
      })
      .then(() => setLoading(false))
      .catch(err => console.error(err))
  }, [user?.email])

  useEffect(() => {
    const oldestTest = query(testsRef, where('email', '==', user?.email), orderBy('date', 'asc'), limit(1))

    getDocs(oldestTest)
      .then(snapshot => {
        setLoading(true)
        setStatData((prev: any) => ({
          ...prev,
          startingWPM: snapshot.docs[0]?.data().wpm,
        }))
      })
      .then(() => setLoading(false))
      .catch(err => console.error(err))
  }, [statData, user?.email])

  const renderStats = Object.values(accountStats).map(({ key, name }) => {
    return (
      <Box key={key}>
        {key !== 'currentWPM' ? (
          <>
            <Text>{name}</Text>
            <Text fontSize={['5xl']}>{statData[key]}</Text>
          </>
        ) : (
          <StatGroup>
            <Stat>
              <StatLabel>Current WPM</StatLabel>
              <StatNumber>{statData[key]}</StatNumber>
              <StatHelpText>
                <StatArrow type={statData.currentWPM > statData.startingWPM ? 'increase' : 'decrease'} />

                {statData.currentWPM / statData.startingWPM > 1 ? (
                  <Text fontSize={['sm']}>
                    <Text fontWeight="bold">{(statData.currentWPM / statData.startingWPM).toFixed(2)}x</Text>
                    <Text> your starting WPM</Text>
                  </Text>
                ) : (
                  <Text fontSize={['sm']}>
                    <Text fontWeight="bold">{(statData.currentWPM / statData.startingWPM).toFixed(2)}x</Text>
                    <Text> your starting WPM</Text>
                  </Text>
                )}
              </StatHelpText>
            </Stat>
          </StatGroup>
        )}
      </Box>
    )
  })

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
