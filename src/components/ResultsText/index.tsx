import { Spinner, Stat, StatLabel, StatNumber, VStack } from '@chakra-ui/react'
import { getDocs, query, where } from 'firebase/firestore'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { testsRef } from '../../firebase'
import { userAtom } from '../../store/firebaseAtoms'
import { getResultsAtom } from '../../store/resultsAtoms'
import { themeAtom } from '../../store/themeAtoms'

function Index({ testId }: { testId: string }) {
  const [user] = useAtom(userAtom)
  const [theme] = useAtom(themeAtom)

  const [loading, setLoading] = useState(true)

  const [{ wpm, accuracy }] = useAtom(getResultsAtom)

  const [data, setData] = useState<any>({
    averageWPM: 0,
    accuracy: 0,
  })

  useEffect(() => {
    if (!user?.email) {
      return setLoading(false)
    }

    const q = query(testsRef, where('testId', '==', testId))

    getDocs(q)
      .then(snapshot => {
        const data = snapshot.docs.map(doc => doc.data())
        setData({ averageWPM: data[0].wpm, accuracy: data[0].accuracy })
      })
      .catch(err => console.error(err))
      .then(() => setLoading(false))
  }, [testId, user?.email])

  return (
    <>
      {!loading ? (
        <VStack align="stretch" justify="space-between" h="100%" p={['4em', 0]} color={theme.textLight}>
          <Stat>
            <StatLabel>Average WPM</StatLabel>
            <StatNumber>{user?.email ? data?.averageWPM : wpm}</StatNumber>
          </Stat>

          <Stat>
            <StatLabel>Accuracy</StatLabel>
            <StatNumber>{user?.email ? data?.accuracy : accuracy}%</StatNumber>
          </Stat>
        </VStack>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default Index
