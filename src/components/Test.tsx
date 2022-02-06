import { Flex, Input, Text, Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'

function Test() {
  const text =
    'hey man hey man hey man hey man hey man hey man hey man hey man hey man hey man hey man hey man hey man hey man hey man hey man hey man hey man hey man hey man hey man hey man hey man hey man hey man hey man hey man hey man'

  const [words, setWords] = React.useState(text.split(' '))

  const [activeWordIndex, setActiveWordIndex] = React.useState(0)

  const [activeCharacterIndex, setActiveCharacterIndex] = React.useState(0)

  const [nodeRefWidth, setNodeRefWidth] = React.useState(0)

  const [typedWord, setTypedWord] = React.useState('')

  const [caret, setCaret] = React.useState({
    top: 6,
  })

  const [diffRowCaret, setDiffRowCaret] = React.useState(0)

  const nodeRef = React.useRef<HTMLSpanElement>(null)

  const caretRef = React.useRef<HTMLDivElement>(null)

  const rowRef = React.useRef<HTMLDivElement>(null)

  const containerRef = React.useRef<HTMLDivElement>(null)

  const onKeyDown = (e: React.KeyboardEvent) => {
    setTypedWord(prev => prev + e.key)
    const { current } = nodeRef
    if (e.code === 'Space') {
      setNodeRefWidth(prev => prev + 8)
      setActiveCharacterIndex(0)

      setActiveWordIndex(activeWordIndex + 1)
    } else {
      if (current) {
        setNodeRefWidth(prev => prev + current?.getClientRects()[0].width)
      } else {
        console.log('no ref')
      }
      setActiveCharacterIndex(prev => prev + 1)
    }
  }

  useEffect(() => {
    console.log(diffRowCaret)
    const { current: caret } = caretRef
    const { current: row } = rowRef
    const { current: node } = nodeRef
    const { current: container } = containerRef

    if (caret && row && node && container) {
      if (
        row.getBoundingClientRect().top - caret.getBoundingClientRect().top >
        diffRowCaret
      ) {
        setDiffRowCaret(
          row.getBoundingClientRect().top - caret.getBoundingClientRect().top
        )
      }
    }
  }, [typedWord])

  useEffect(() => {
    console.log('DIFFERENCE DETECTED', diffRowCaret)
    const { current: caret } = caretRef

    if (caret) {
      setNodeRefWidth(0)

      setCaret({
        top: diffRowCaret,
      })
    }
  }, [diffRowCaret])

  useEffect(() => {
    const { current: caret } = caretRef
    const { current: row } = rowRef
    const { current: node } = nodeRef
    const { current: container } = containerRef

    if (caret && row && node && container) {
      console.log('row', row.getBoundingClientRect().top)
      console.log('container', container.getBoundingClientRect().top)
      console.log('caret', caret.getBoundingClientRect().top)
      setDiffRowCaret(
        row.getBoundingClientRect().top - caret.getBoundingClientRect().top
      )
    }
  }, [])

  return (
    <>
      <Input autoFocus onKeyDown={e => onKeyDown(e)} />
      <Flex
        wrap="wrap"
        h="138px"
        ref={containerRef}
        overflow="hidden"
        position="relative"
        w="200px"
        border="1px solid red"
        boxSize="border-box"
      >
        <Box
          ref={caretRef}
          position="absolute"
          transform={`translateX(${nodeRefWidth - 2}px)`}
          transition="transform 0.1s linear"
          top={`${caret.top}px`}
          left={`${6}px`}
          bg="green.500"
          h="30px"
          borderRadius="sm"
          w="2px"
        />
        {words.map((word, wordIndex) => {
          return (
            <Box
              ref={activeWordIndex === wordIndex ? rowRef : null}
              fontSize="2xl"
              m="1"
              key={wordIndex}
              border={activeWordIndex === wordIndex ? '1px solid red' : 'none'}
            >
              {word.split('').map((node, index) => {
                return (
                  <span
                    ref={
                      activeCharacterIndex === index &&
                      activeWordIndex === wordIndex
                        ? nodeRef
                        : undefined
                    }
                    key={index}
                  >
                    {node}
                  </span>
                )
              })}
            </Box>
          )
        })}
      </Flex>
    </>
  )
}

export default Test
