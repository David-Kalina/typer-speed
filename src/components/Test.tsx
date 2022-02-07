import { Box, Flex, Input, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'

interface TestProps {
  fontSize: number
  margin: number
  text: any
}

function Test({ fontSize, margin, text }: TestProps) {
  const [activeWordIndex, setActiveWordIndex] = React.useState(0)
  const [activeCharacterIndex, setActiveCharacterIndex] = React.useState(0)
  const [previousNodeRefWidth, setPreviousNodeRefWidth] = React.useState(0)
  const [currentNodeRefWidth, setCurrentNodeRefWidth] = React.useState(0)
  const [totalWidth, setTotalWidth] = React.useState(0)
  // const [nextNodeRefWidth, setNextNodeRefWidth] = React.useState(0)
  const [nodeRefHeight, setNodeRefHeight] = React.useState(0)
  const [typed, setTyped] = React.useState('')
  const [currentTyped, setCurrentTyped] = React.useState('')
  const nodeRef = React.useRef<HTMLSpanElement>(null)
  const caretRef = React.useRef<HTMLDivElement>(null)
  const wordRef = React.useRef<HTMLDivElement>(null)

  const [previousSibling, setPreviousSibling] = React.useState(null)

  // const [correctCharacters, setCorrectCharacters] = React.useState<string[]>([])


  const onKeyDown = (e: React.KeyboardEvent) => {
    const { current: node } = nodeRef

    setCurrentTyped(e.key)

    // setCurrentTyped({
    //   index: `${activeWordIndex}-${activeCharacterIndex}`,
    //   value: e.key,
    // })
    if (e.code === 'Backspace') {
      setTyped(typed.slice(0, -1))
      if (activeCharacterIndex === 0) return
      const newActiveCharacterIndex = activeCharacterIndex - 1
      setActiveCharacterIndex(newActiveCharacterIndex)
      node ? setTotalWidth(prev => prev - previousNodeRefWidth) : setTotalWidth(prev => prev - currentNodeRefWidth)
    } else {
      setTyped(typed + e.key)
      if (e.code === 'Space') {
        setTotalWidth(prev => prev + margin * 8)
        setActiveCharacterIndex(0)
        setActiveWordIndex(activeWordIndex + 1)
      } else {
        if (node) setTotalWidth(prev => prev + currentNodeRefWidth || node.getClientRects()[0].width)

        setActiveCharacterIndex(prev => prev + 1)
      }
    }
  }

  useEffect(() => {
    const { current: node } = nodeRef
    if (node) setNodeRefHeight(node.getClientRects()[0].height)
  }, [])

  useEffect(() => {
    const { current: node } = nodeRef

    console.log(previousSibling)

    if (text[activeWordIndex].characters[activeCharacterIndex - 1]) {
      currentTyped === text[activeWordIndex].characters[activeCharacterIndex - 1].text
        ? (text[activeWordIndex].characters[activeCharacterIndex - 1].className = 'correct')
        : (text[activeWordIndex].characters[activeCharacterIndex - 1].className = 'incorrect')
    } else {
      text[activeWordIndex].characters[activeCharacterIndex - 1] = {
        text: '',
        className: 'default',
      }
    }
  })

  const assignRef = (ownIndex: number, wordIndex: number, activeCharacterIndex: number, activeWordIndex: number) => {
    if (activeWordIndex === wordIndex) {
      if (activeCharacterIndex === ownIndex) return nodeRef
    }
  }

  useEffect(() => {
    const { current: node } = nodeRef
    if (node && node.previousElementSibling) {
      setPreviousSibling(node.previousElementSibling.innerHTML as any)
      const lastWidth = node.previousElementSibling.getClientRects()[0].width
      const currentWidth = node.getClientRects()[0].width
      const nextWidth = node.nextElementSibling?.getClientRects()[0].width || 0

      setCurrentNodeRefWidth(currentWidth)
      setPreviousNodeRefWidth(lastWidth)
      // setNextNodeRefWidth(nextWidth)
    } else if (node) {
      setPreviousNodeRefWidth(node.previousElementSibling?.innerHTML as any)
      const currentWidth = node.getClientRects()[0].width
      // const nextWidth = node.nextElementSibling?.getClientRects()[0].width || 0
      // console.log(`currentWidth: ${currentWidth}, nextWidth: ${nextWidth}`)

      setCurrentNodeRefWidth(currentWidth)
      // setNextNodeRefWidth(nextWidth)
    }
  }, [activeCharacterIndex])

  useEffect(() => {
    const { current: caret } = caretRef
    const { current: word } = wordRef
    if (caret && word) {
      if (caret.offsetTop !== word.offsetTop) {
        caret.style.top = `${word.offsetTop}px`
        setTotalWidth(0)
      }
    }
  }, [activeWordIndex])

  return (
    <>
      <Input autoFocus onKeyDown={e => onKeyDown(e)} />

      {/* <Text>{typed}</Text> */}
      <Flex
        wrap="wrap"
        maxH="130px"
        overflow="hidden"
        position="relative"
        w="200px"
        border="1px solid red"
        boxSize="border-box"
      >
        <Box
          ref={caretRef}
          position="absolute"
          transform={`translateX(${totalWidth}px)`}
          transition="transform 0.1s ease-in-out"
          top={`${margin * 4}px`}
          left={`${margin * 4}px`}
          bg="green.300"
          h={`${nodeRefHeight}px`}
          borderRadius="sm"
          w={`${fontSize * 0.1}px`}
        />
        {Object.values(text).map((x: any, wordIndex) => {
          return (
            <Box
              ref={activeWordIndex === wordIndex ? wordRef : null}
              fontSize={fontSize}
              m={margin}
              key={wordIndex}
              border={activeWordIndex === wordIndex ? '1px solid red' : 'none'}
            >
              {x.characters.map((node: any, index: number) => {
                return (
                  <span
                    ref={assignRef(index, wordIndex, activeCharacterIndex, activeWordIndex)}
                    key={index}
                    className={node.className}
                  >
                    {node.text}
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
