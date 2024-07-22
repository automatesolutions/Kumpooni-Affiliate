import React, { useCallback, useState } from 'react'
import { ListRenderItemInfo, StyleSheet, Keyboard } from 'react-native'
import type { SelectOption, SelectProps } from './types'

import { SelectButton } from './SelectButton'
import { useDialogControl } from '#/components/Dialog'
import { SelectDialog } from './Select'
import { atoms as a, useTheme } from '#/theme'
export function Select<T>({
  options,
  onChange,
  disabled,
  invalid,
  placeholder = 'Select Item',
  value,
  style,
}: SelectProps<T>) {
  const control = useDialogControl()
  const t = useTheme()
  const onOpen = useCallback(() => {
    Keyboard.dismiss()
    control.open()
  }, [control])

  return (
    <>
      <SelectButton
        label={
          value !== undefined
            ? options?.filter(t => t.value === value)?.[0]?.label ?? placeholder
            : placeholder
        }
        disabled={disabled}
        onPress={onOpen}
        styles={[styles.btn, a.rounded_sm, a.px_sm, style]}
        invalid={invalid}
      />
      <SelectDialog control={control} options={options} onChange={onChange} />
    </>
  )
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'red',
    paddingVertical: 14,
    paddingHorizontal: 16,
    lineHeight: a.text_lg.fontSize * 1.1875,
  },
})
