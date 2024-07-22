import * as Dialog from '#/components/Dialog'
import {
  GestureResponderEvent,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  View,
} from 'react-native'
import { Text } from '../../Typography'

import { useCallback } from 'react'
import { SelectOption, SelectProps } from './types'
import { SelectItem } from './SelectItem'

export function SelectDialog<T>({
  control,
  options,
  onChange,
}: {
  options: SelectOption<T>[] | undefined
  control: Dialog.DialogControlProps
  onChange?: (value: T) => void
}) {
  const onPressItem = useCallback(
    (val: T) => {
      if (onChange) {
        control.close(() => onChange(val))
      }
    },
    [control, onChange],
  )

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<SelectOption<T>>) => {
      return (
        <SelectItem
          value={item.value}
          label={item.label}
          onChange={onPressItem}
        />
      )
    },
    [onPressItem],
  )
  return (
    <Dialog.Outer
      control={control}
      nativeOptions={{
        sheet: {
          snapPoints: ['70%'],
        },
      }}>
      <Dialog.Handle />
      <Dialog.InnerFlatList data={options} renderItem={renderItem} />
    </Dialog.Outer>
  )
}
