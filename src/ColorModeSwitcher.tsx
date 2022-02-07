import { IconButtonProps, Switch, useColorMode } from '@chakra-ui/react'
import * as React from 'react'

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = () => {
  const { toggleColorMode, colorMode } = useColorMode()

  return <Switch size="sm" defaultChecked={colorMode === 'dark' ? false : true} onChange={toggleColorMode} />
}
