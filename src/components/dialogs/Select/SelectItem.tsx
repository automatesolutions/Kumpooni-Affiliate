import React, { useCallback } from 'react'
import {
  Pressable,
  GestureResponderEvent,
  View,
  Text,
  StyleSheet,
} from 'react-native'
import { SelectProps } from './types'

interface SelectItemProps<T> extends SelectProps<T> {
  value: T
  label: string
  disabled?: boolean
}

export function SelectItem<T>({
  label,
  value,
  disabled,
  onChange: onPress,
  ...rest
}: SelectItemProps<T>) {
  const handlePress = useCallback(
    (e: GestureResponderEvent) => {
      onPress(value)
    },
    [value, onPress],
  )

  return (
    <Pressable onPress={handlePress} {...rest}>
      <View style={styles.contentStyle}>
        <Text style={styles.label}>{label}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  contentStyle: {
    paddingVertical: 8,
    paddingHorizontal: 12,

    margin: 4,
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e1e1e',
    textTransform: 'capitalize',
  },
})
