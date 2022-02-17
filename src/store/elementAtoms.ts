import { atom } from 'jotai'

export const caretElementAtom = atom<HTMLDivElement | null>(null)

export const currentCharacterElementAtom = atom<HTMLDivElement | null>(null)

export const currentWordElementAtom = atom<HTMLDivElement | null>(null)

export const currentExtraCharacterElementAtom = atom<HTMLDivElement | null>(null)

export const keyManagerAtom = atom<HTMLInputElement | null>(null)
