import { Box, HStack, Stat, StatLabel, StatNumber, useTheme, Text } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useAuth } from '../../contexts/AuthContext'
import {
  getAccuracyDataAtom,
  getMostMissedCharacterAtom,
  getMostMissedWordAtom,
  getRecapDataAtom,
  getWPMDataAtom,
} from '../../store/resultsAtoms'
import { testFinishedAtom, themeAtom } from '../../store/typingTestAtoms'

function Index() {
  const [testFinished] = useAtom(testFinishedAtom)
  const { user } = useAuth()
  const [recapData] = useAtom(getRecapDataAtom)
  const [averageWPM] = useAtom(getWPMDataAtom)
  const [averageAccuracy] = useAtom(getAccuracyDataAtom)
  const [mostMissedWord] = useAtom(getMostMissedWordAtom)
  const [mostMissedCharacter] = useAtom(getMostMissedCharacterAtom)
  const [theme] = useAtom(themeAtom)

  const chakraTheme = useTheme()

  console.log(chakraTheme.colors[theme][100])

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
    <Box>
      {testFinished && recapData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300} maxHeight={300}>
          <LineChart data={recapData}>
            <XAxis dataKey="seconds" />
            <YAxis dataKey="wpm" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="wpm" fill={`${chakraTheme.colors[theme][200]}`} animationDuration={5000} />
            <Line
              type="monotone"
              dataKey="incorrect"
              stroke={`${chakraTheme.colors[theme]['incorrect']}`}
              animationDuration={5000}
              zoomAndPan="incorrect"
            />
          </LineChart>
        </ResponsiveContainer>
      ) : null}

      <HStack>
        <Stat>
          <StatLabel>Average WPM</StatLabel>
          <StatNumber>{averageWPM.wpm}</StatNumber>

          <StatLabel>Accuracy</StatLabel>
          <StatNumber>{averageAccuracy.accuracy}%</StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Most Missed Word</StatLabel>
          <Text>{mostMissedWord.mostMissedWord}</Text>

          <StatLabel>Accuracy</StatLabel>
          <StatNumber>{averageAccuracy.accuracy}%</StatNumber>
        </Stat>
      </HStack>
    </Box>
  )
}

Index.displayName = 'TypingTest'

export default Index
