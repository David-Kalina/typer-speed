import { IconButtonProps, Switch, useColorMode } from '@chakra-ui/react'
import * as React from 'react'

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = props => {
  const { toggleColorMode } = useColorMode()

  return <Switch size="lg" onChange={toggleColorMode} />
}
