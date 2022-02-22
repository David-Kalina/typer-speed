import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { minimal, typerSpeed } from '../constants/themes'

export interface ThemeValues {
  name: string
  background: string
  textLight: string
  buttonLight: string
  buttonDark: string
  textDark: string
  modal: string
  accent1: string
  accent2: string
  accent3: string
  default: string
  correct: string
  incorrect: string
  missed: string
  extra: string
}

export interface ThemeName {
  [key: string]: ThemeValues
}

export const themesAtom = atom<ThemeName>({
  minimal: minimal,
  typerSpeed: typerSpeed,
  custom: {
    name: 'Custom',
    background: '#050606',
    textLight: '#FFFFFF',
    textDark: '#050606',
    buttonDark: '#050606',
    buttonLight: '#FFFFFF',
    modal: '#050606',
    accent1: '#FDFDFD',
    accent2: '#D8D7D5',
    accent3: '#ADB3BC',
    default: '#ADB3BC',
    correct: '#FDFDFD',
    incorrect: '#e60343',
    missed: '#ADB3BC',
    extra: '#ADB3BC',
  },
})

export const themeAtom = atomWithStorage('theme', minimal)

export const setThemesAtom = atom(
  () => '',
  (get, set, { name, value }: { name: string; value: ThemeValues }) => {
    if (name === 'custom') {
      set(themeAtom, value)
    } else {
      set(themeAtom, get(themesAtom)[name])
    }
  }
)

export const fontSizeAtom = atom<number>(2)

export const fontFamilyAtom = atomWithStorage<string>('fontFamily', 'Roboto Mono')
