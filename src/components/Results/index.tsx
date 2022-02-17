import { Flex, Stat, StatLabel, StatNumber, useTheme, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { getAccuracyDataAtom, getRecapDataAtom, getWPMDataAtom } from '../../store/resultsAtoms'
import { testFinishedAtom, themeAtom } from '../../store/typingTestAtoms'

function Index() {
  const [testFinished] = useAtom(testFinishedAtom)
  // const { user } = useAuth()
  const [recapData] = useAtom(getRecapDataAtom)
  const [averageWPM] = useAtom(getWPMDataAtom)
  const [averageAccuracy] = useAtom(getAccuracyDataAtom)
  const [theme] = useAtom(themeAtom)

  const chakraTheme = useTheme()

  // useEffect(() => {
  //   if (user && user.email) {
  //     addDoc(testsRef, {
  //       email: user?.email,
  //       recap: recapData,
  //       wpm: averageWPM,
  //       accuracy: averageAccuracy,
  //       seconds: 60,
  //       date: {
  //         seconds: Date.now() / 1000,
  //         nanoseconds: Date.now() / 1000000,
  //       },
  //     })
  //   }
  //   const statsRef = doc(db, 'stats', user?.email as string)

  //   setDoc(
  //     statsRef,
  //     {
  //       testsTaken: increment(1),
  //       testsCompleted: increment(1),
  //       timeTyping: increment(15),
  //     },
  //     { merge: true }
  //   )
  // }, [averageAccuracy, averageWPM, recapData, user])

  return (
    <Flex p="4em" flexDir="row-reverse" fontSize="0.25em">
      {testFinished && recapData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300} maxHeight={300}>
          <LineChart data={recapData}>
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
          <StatNumber>{averageWPM.wpm}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Accuracy</StatLabel>
          <StatNumber>{averageAccuracy.accuracy}%</StatNumber>
        </Stat>
      </VStack>
    </Flex>
  )
}

Index.displayName = 'TypingTest'

export default Index
