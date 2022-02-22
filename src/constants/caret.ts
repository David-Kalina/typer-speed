export interface CaretOptionValues {
  value: number | string
  type: 'slider' | 'color'
  min?: number
  label: string
  max?: number
  onChange: (value: number) => void
}

export interface CaretOption {
  [key: string]: CaretOptionValues
}

export const caretOptions: CaretOption = {
  opacity: {
    label: 'Opacity',
    type: 'slider',
    min: 0,
    max: 100,
    value: 100,
    onChange: (value: number) => {
      console.log(value)
    },
  },
  smoothness: {
    label: 'Smoothness',
    type: 'slider',
    min: 0,
    max: 100,
    value: 100,
    onChange: (value: number) => {
      console.log(value)
    },
  },
  color: {
    label: 'Color',
    type: 'color',
    value: 'black',
    onChange: (value: number) => {
      console.log(value)
    },
  },
}
