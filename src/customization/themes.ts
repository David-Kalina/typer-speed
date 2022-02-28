import { ThemeValues } from '../store/themeAtoms'

export const typerSpeed: ThemeValues = {
  background: '#050606',
  default: '#ADB3BC',
  correct: '#FDFDFD',
  incorrect: '#e60343',
  missed: '#ADB3BC',
  extra: '#8b0000',
  name: 'Default',
  textLight: '#ADB3BC',
  textDark: '#050606',
  buttonLight: '#050606',
  buttonDark: '#FDFDFD',
  modal: '#050606',
}

export const custom: ThemeValues = {
  background: '#050606',
  default: '#ADB3BC',
  correct: '#FDFDFD',
  incorrect: '#e60343',
  missed: '#ADB3BC',
  extra: '#8b0000',
  name: 'Custom',
  textLight: '#ADB3BC',
  textDark: '#050606',
  buttonLight: '#050606',
  buttonDark: '#FDFDFD',
  modal: '#050606',
}

export const zen: ThemeValues = {
  ...typerSpeed,
  background: 'transparent',
}
