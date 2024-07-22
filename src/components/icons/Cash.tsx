import * as React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Svg, { Path } from 'react-native-svg'

export function CashSvg({
  style,
  color = '#808285',
  size,
  strokeWidth,
}: {
  style?: StyleProp<ViewStyle>
  color?: string
  size?: number | string
  strokeWidth?: number
}) {
  return (
    <Svg
      strokeWidth={strokeWidth}
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill={color}
      style={style}>
      <Path
        d="M27.999 29.167a8.166 8.166 0 100 16.333 8.166 8.166 0 000-16.333zm-3.5 8.167a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"
        fill={color}
      />
      <Path
        d="M40.894 11.938l-7.418-10.4L6.202 23.327 4.69 23.31v.024H3.5v28h49v-28h-2.245L45.79 10.269l-4.895 1.669zm4.431 11.396H21.926l17.428-5.94 3.551-1.137 2.42 7.077zm-9.042-9.824l-17.99 6.132L32.541 8.26l3.742 5.25zM8.167 42.395V32.268A7.02 7.02 0 0012.437 28h31.126a7.022 7.022 0 004.27 4.27v10.127a7.021 7.021 0 00-4.27 4.27H12.441a7.022 7.022 0 00-4.274-4.272z"
        fill={color}
      />
    </Svg>
  )
}
