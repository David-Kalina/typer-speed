import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { typerSpeed, custom } from '../constants/themes'

export type ThemeValues = {
  name: string
  background: string
  textLight: string
  buttonLight: string
  buttonDark: string
  textDark: string
  modal: string
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
  typerSpeed,
  custom,
})

export const themeAtom = atomWithStorage('theme', typerSpeed)

export const setThemesAtom = atom(
  () => '',
  (get, set, { name, value }: { name: string; value: ThemeValues }) => {
    if (name === 'custom') {
      set(themesAtom, {
        ...get(themesAtom),
        custom: value,
      })
      set(themeAtom, value)
    } else {
      set(themeAtom, get(themesAtom)[name])
    }
  }
)

export const fontSizeAtom = atom<number>(2)

export const fontFamilyAtom = atomWithStorage<string>('fontFamily', 'Roboto Mono')
