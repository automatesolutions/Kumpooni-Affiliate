import { Parts } from '#/modules/shared/types'
import { StyleProp, ViewStyle } from 'react-native'

export interface SelectOption<T> {
  value: T
  label: string
}

export interface SelectProps<T> {
  value?: T
  placeholder?: string
  options?: SelectOption<T>[]
  disabled?: boolean
  onChange: (value: T) => void
  style?: StyleProp<ViewStyle>
  invalid?: boolean
}
