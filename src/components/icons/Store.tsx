import React from 'react'
import { StyleSheet } from 'react-native'

import { useTheme, atoms as a } from '#/theme'
import { Path, Svg } from 'react-native-svg'
type StoreProps = {
  size?: string | number
  color?: string
  strokeWidth?: number
}
export function StoreIcon({ size, color, strokeWidth }: StoreProps) {
  const t = useTheme()
  return (
    <Svg
      fill="none"
      viewBox="0 0 24 24"
      height={size || 24}
      width={size || 24}
      stroke-width={strokeWidth || 1.5}
      stroke={color}>
      <Path
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
      />
    </Svg>
  )
}

const styles = StyleSheet.create({})
