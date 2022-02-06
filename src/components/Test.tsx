import { Box, Flex, Input } from '@chakra-ui/react'
import React, { useEffect } from 'react'

function Test() {
  const text = `dirtbag scum clown insane revolutionary this is an insane typing test where you type as fast as you can. I am your host and you are your opponent. You can type in the text box below and I will tell you how fast you type.`

  const [words, setWords] = React.useState(text.split(' '))

  const [activeWordIndex, setActiveWordIndex] = React.useState(0)

  const [activeCharacterIndex, setActiveCharacterIndex] = React.useState(0)

  const [nodeRefWidth, setNodeRefWidth] = React.useState(0)

  const [nodeRefHeight, setNodeRefHeight] = React.useState(0)

  const [margin, setMargin] = React.useState(1)

  const [fontSize, setFontSize] = React.useState(32)

  const [caret, setCaret] = React.useState({
    top: 6,
  })

  const nodeRef = React.useRef<HTMLSpanElement>(null)

  const caretRef = React.useRef<HTMLDivElement>(null)

  const rowRef = React.useRef<HTMLDivElement>(null)

  const containerRef = React.useRef<HTMLDivElement>(null)

  const onKeyDown = (e: React.KeyboardEvent) => {
    const { current: node } = nodeRef

    if (e.code === 'Space') {
      setNodeRefWidth(prev => prev + margin * 8)
      setActiveCharacterIndex(0)

      setActiveWordIndex(activeWordIndex + 1)
    } else {
      if (node) {
        setNodeRefWidth(prev => prev + node.getClientRects()[0].width)
      } else {
        console.log('no ref')
      }
      setActiveCharacterIndex(prev => prev + 1)
    }
  }

  useEffect(() => {
    const { current: node } = nodeRef

    if (node) {
      setNodeRefHeight(node.getClientRects()[0].height)
    }
  }, [])

  return (
    <>
      <Input autoFocus onKeyDown={e => onKeyDown(e)} />
      <Flex
        wrap="wrap"
        maxH="175px"
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
          transform={`translateX(${nodeRefWidth - fontSize * 0.1}px)`}
          transition="transform 0.05s linear"
          top={`${margin * 4 + fontSize * 0.1}px`}
          left={`${margin * 4 + fontSize * 0.1}px`}
          bg="green.300"
          h={`${nodeRefHeight}px`}
          borderRadius="sm"
          w={`${fontSize * 0.1}px`}
        />
        {words.map((word, wordIndex) => {
          return (
            <Box
              ref={activeWordIndex === wordIndex ? rowRef : null}
              fontSize={fontSize}
              m={margin}
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
