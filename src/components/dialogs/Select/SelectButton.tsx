import {
  ChevronDownIcon,
  ChevronRight,
  ChevronUpIcon,
} from 'lucide-react-native'
import React, { forwardRef, useState } from 'react'
import { Pressable, StyleSheet, View, StyleProp, ViewStyle } from 'react-native'
import { atoms as a, useTheme } from '#/theme'
import { Text } from '#/components/Typography'
interface SelectButtonProps {
  label: string
  invalid?: boolean
  disabled?: boolean
  onPress?: () => void
  styles?: StyleProp<ViewStyle>
}

export const SelectButton: React.FC<SelectButtonProps> = forwardRef(
  (
    { label, disabled, styles: overideStyle, invalid, onPress, ...rest },
    ref,
  ) => {
    const t = useTheme()
    return (
      <>
        <Pressable
          //@ts-ignore
          ref={ref}
          onPress={onPress}
          disabled={disabled}
          {...rest}>
          <View
            style={[
              styles.containerStyle,
              overideStyle,
              {
                borderWidth: 2,
                backgroundColor: invalid
                  ? t.palette.negative_25
                  : t.palette.contrast_25,

                borderColor: invalid
                  ? t.palette.negative_300
                  : t.palette.contrast_25,
              },
            ]}>
            <Text
              style={[
                styles.label,
                a.text_lg,
                {
                  color: disabled
                    ? '#000'
                    : invalid
                    ? 'red'
                    : t.palette.contrast_900,
                },
              ]}>
              {label}
            </Text>
            {/* 
            <ChevronRight
              height={20}
              width={20}
              color={invalid ? 'red' : '#000'}
            /> */}
          </View>
        </Pressable>
        {invalid && <Text style={styles.helperText}>{'required*'}</Text>}
      </>
    )
  },
)

SelectButton.displayName = 'SelectButton'

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 5,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    textTransform: 'capitalize',
  },
  helperText: {
    marginHorizontal: 16,
    color: 'red',
    fontSize: 10,
  },
})
