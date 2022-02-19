import { Flex, Spinner, Stat, StatLabel, StatNumber, useTheme, VStack } from '@chakra-ui/react'
import { getDocs, query, where } from 'firebase/firestore'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { useAuth } from '../../contexts/AuthContext'
import { testsRef } from '../../firebase'
import { testIdAtom, themeAtom } from '../../store/typingTestAtoms'

function Index() {
  const { user } = useAuth()

  const [theme] = useAtom(themeAtom)

  const [loading, setLoading] = useState(true)

  const [data, setData] = useState<any>({
    recap: [],
    averageWPM: 0,
    accuracy: 0,
  })

  const chakraTheme = useTheme()

  const [testId] = useAtom(testIdAtom)

  useEffect(() => {
    const q = query(testsRef, where('email', '==', user?.email), where('testId', '==', testId))

    getDocs(q)
      .then(snapshot => {
        const data = snapshot.docs.map(doc => doc.data())
        setData({
          recap: data[0].recap,
          averageWPM: data[0].wpm,
          accuracy: data[0].accuracy,
        })
      })
      .catch(err => console.error(err))
      .then(() => setLoading(false))
  }, [testId, user?.email])

  return (
    <Flex p="4em" flexDir="row-reverse" fontSize="0.4em">
      {!loading ? (
        <>
          {data.recap.length > 0 ? (
            <ResponsiveContainer width="100%" height={300} maxHeight={300}>
              <LineChart data={data?.recap}>
                <CartesianGrid stroke={`${chakraTheme.colors[theme][200]}`} strokeDasharray="3, 3" />
                <XAxis dataKey="seconds" />
                <YAxis dataKey="wpm" yAxisId="left" />
                <YAxis dataKey="incorrect" yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line type="monotone" yAxisId="left" dataKey="wpm" fill={`${chakraTheme.colors[theme][200]}`} />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="incorrect"
                  stroke={`${chakraTheme.colors[theme]['incorrect']}`}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : null}

          <VStack align="stretch" justify="space-between" h="100%" color={`${chakraTheme.colors[theme][200]}`}>
            <Stat>
              <StatLabel>Average WPM</StatLabel>
              <StatNumber>{data?.averageWPM}</StatNumber>
            </Stat>

            <Stat>
              <StatLabel>Accuracy</StatLabel>
              <StatNumber>{data?.accuracy}%</StatNumber>
            </Stat>
          </VStack>
        </>
      ) : (
        <Spinner />
      )}
    </Flex>
  )
}

Index.displayName = 'TypingTest'

export default Index
