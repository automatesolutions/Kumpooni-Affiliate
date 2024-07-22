import * as React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg'

export function CarSvg({
  size,
  strokeWidth,
  style,
  color,
}: {
  color?: string
  size?: string | number
  style?: StyleProp<ViewStyle>
  strokeWidth?: number
}) {
  return (
    <Svg
      strokeWidth={strokeWidth}
      width={size || 24}
      height={size || 24}
      viewBox="0 0 62 62"
      fill={color}
      style={style}>
      <G clipPath="url(#clip0_5605_143)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M40.725 10.333a7.75 7.75 0 016.931 4.283l3.58 7.159c.63-.259 1.25-.538 1.86-.837a2.584 2.584 0 112.31 4.624c-.62.276-1.245.545-1.873.806l2.483 4.968a7.748 7.748 0 01.819 3.469v6.528a7.724 7.724 0 01-2.584 5.776v3.266a3.875 3.875 0 01-7.75 0v-1.292h-31v1.292a3.875 3.875 0 01-7.75 0v-3.266a7.733 7.733 0 01-2.583-5.776v-6.53c0-1.203.28-2.39.819-3.465l2.462-4.929a32.96 32.96 0 01-1.847-.845 2.61 2.61 0 01-1.163-3.47 2.582 2.582 0 013.467-1.156c.61.302 1.232.578 1.86.837l3.58-7.156a7.748 7.748 0 016.932-4.286h19.447zm-21.349 23.25a3.875 3.875 0 100 7.75 3.875 3.875 0 000-7.75zm23.25 0a3.875 3.875 0 100 7.75 3.875 3.875 0 000-7.75zM40.725 15.5H21.278a2.583 2.583 0 00-2.15 1.15l-.16.278-3.28 6.557c3.998 1.198 9.387 2.348 15.313 2.348 5.534 0 10.595-1.002 14.493-2.11l.819-.238-3.279-6.557a2.584 2.584 0 00-1.989-1.408l-.317-.02h-.003z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_5605_143">
          <Path fill="#fff" d="M0 0H62V62H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}
