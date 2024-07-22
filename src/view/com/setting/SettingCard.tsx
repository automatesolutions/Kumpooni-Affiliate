import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from '#/components/Typography'
import { useTheme, atoms as a } from '#/theme'
import { HStack } from '#/components/HStack'
import { color } from '#/theme/tokens'
import { Props as SVGIconProps, sizes } from '#/components/icons/common'
import { StoreIcon } from '#/components/icons/Store'
type SettingCardProps = {
  title: string
  helperText?: string
  icon: React.ReactNode
  onPress?: () => void
}
export function SettingCard({
  title,
  icon: Comp,
  helperText,
  onPress,
}: SettingCardProps) {
  const t = useTheme()
  return (
    <TouchableOpacity
      style={[
        a.flex_1,
        a.flex_row,
        a.justify_center,
        a.pt_sm,
        a.px_sm,
        a.rounded_md,
        a.gap_md,
        a.align_start,
        t.atoms.bg_contrast_25,
        { height: 85 },
      ]}
      onPress={onPress}>
      <View style={[a.flex_1, a.flex_row, a.gap_lg, { width: 48, height: 48 }]}>
        <View
          style={[
            a.align_center,
            a.justify_center,
            a.rounded_xs,
            {
              height: 48,
              width: 48,
              backgroundColor: color.gray_50,
            },
          ]}>
          {Comp}
        </View>
        <View style={[a.justify_between]}>
          <Text style={[a.font_bold, a.text_md]}>{title}</Text>
          <Text style={[t.atoms.text_contrast_medium]}>{helperText}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})
