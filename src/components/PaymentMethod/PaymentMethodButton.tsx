import React from 'react'
import { View, ViewStyle, TextStyle } from 'react-native'

import { useTheme, atoms as a, native } from '#/theme'
import * as Toggle from '#/components/forms/Toggle'
import { Text } from '#/components/Typography'
import { color } from '#/theme/tokens'

export function PaymentMethodButton({ paymentType }: { paymentType: string }) {
  const t = useTheme()

  const ctx = Toggle.useItemContext()

  const styles = React.useMemo(() => {
    const hovered: ViewStyle[] = [
      {
        backgroundColor: t.name === 'light' ? '#fff' : '#fff',
      },
    ]
    const focused: ViewStyle[] = []
    const pressed: ViewStyle[] = []
    const selected: ViewStyle[] = [
      {
        backgroundColor: t.palette.positive_100,
        borderColor: t.palette.positive_400,
        borderWidth: 1,
      },
    ]
    const selectedHover: ViewStyle[] = [
      {
        backgroundColor: t.palette.positive_200,
      },
    ]
    const textSelected: TextStyle[] = [
      {
        color: t.palette.positive_700,
      },
    ]

    return {
      hovered,
      focused,
      pressed,
      selected,
      selectedHover,
      textSelected,
    }
  }, [t])

  return (
    <View
      style={[
        {
          backgroundColor: '#fff',
          paddingVertical: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: color.gray_200,
          borderWidth: 1,
          width: 100,
          gap: 1,
        },
        a.rounded_xs,
        a.px_sm,
        ctx.hovered ? styles.hovered : {},
        ctx.focused ? styles.hovered : {},
        ctx.pressed ? styles.hovered : {},
        ctx.selected ? styles.selected : {},
        ctx.selected && (ctx.hovered || ctx.focused || ctx.pressed)
          ? styles.selectedHover
          : {},
      ]}>
      <Text
        style={[
          {
            color: t.palette.contrast_900,
          },
          native({ paddingTop: 2 }),
          ctx.selected ? styles.textSelected : {},
        ]}>
        {paymentType}
      </Text>
    </View>
  )
}
