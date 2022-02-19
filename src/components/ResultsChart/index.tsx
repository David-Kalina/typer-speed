import { Flex, Spinner, useTheme } from '@chakra-ui/react'
import { getDocs, query, where } from 'firebase/firestore'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { testsRef } from '../../firebase'
import { userAtom } from '../../store/firebaseAtoms'
import { getResultsAtom } from '../../store/resultsAtoms'
import { themeAtom } from '../../store/typingTestAtoms'

function Index({ testId }: { testId: string }) {
  const [theme] = useAtom(themeAtom)
  const [user] = useAtom(userAtom)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any[]>([])
  const [{ recap }] = useAtom(getResultsAtom)
  const chakraTheme = useTheme()

  useEffect(() => {
    if (!user?.email) {
      return setLoading(false)
    }
    const q = query(testsRef, where('testId', '==', testId))

    getDocs(q)
      .then(snapshot => {
        const data = snapshot.docs.map(doc => doc.data())
        setData(data[0].recap)
      })
      .catch(err => console.error(err))
      .then(() => setLoading(false))
  }, [testId, user?.email])

  return (
    <Flex flex={1}>
      {!loading && data ? (
        <ResponsiveContainer width="100%" height={300} maxHeight={300}>
          <LineChart data={user?.email ? data : recap}>
            <CartesianGrid stroke={`${chakraTheme.colors[theme][200]}`} strokeDasharray="5, 5" />
            <XAxis dataKey="seconds" />
            <YAxis dataKey="wpm" yAxisId="left" />
            <YAxis dataKey="incorrect" yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line type="monotone" yAxisId="left" dataKey="wpm" fill={`${chakraTheme.colors[theme]['correct']}`} />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="incorrect"
              stroke={`${chakraTheme.colors[theme]['incorrect']}`}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Flex justifyContent="center" alignItems="center" height="100%" width="100%">
          <Spinner />
        </Flex>
      )}
    </Flex>
  )
}

export default Index
