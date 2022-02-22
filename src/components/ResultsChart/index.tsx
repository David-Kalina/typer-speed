import { Flex, Spinner } from '@chakra-ui/react'
import { getDocs, query, where } from 'firebase/firestore'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { testsRef } from '../../firebase'
import { userAtom } from '../../store/firebaseAtoms'
import { getResultsAtom } from '../../store/resultsAtoms'
import { themeAtom } from '../../store/themeAtoms'

function Index({ testId }: { testId: string }) {
  const [theme] = useAtom(themeAtom)
  const [user] = useAtom(userAtom)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any[]>([])
  const [{ recap }] = useAtom(getResultsAtom)

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
          <ComposedChart data={user?.email ? data : recap}>
            <CartesianGrid strokeDasharray="8, 8" />
            <XAxis dataKey="seconds" stroke={theme.default} />
            <YAxis dataKey="wpm" yAxisId="left" stroke={theme.correct} />
            <YAxis dataKey="incorrect" yAxisId="right" stroke={theme.incorrect} orientation="right" />
            <Tooltip />
            <Legend />
            <Line type="monotone" yAxisId="left" dataKey="wpm" stroke={theme.correct} />
            <Scatter shape="cross" name="incorrect" yAxisId="right" dataKey="incorrect" stroke={theme.incorrect} />
          </ComposedChart>
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
