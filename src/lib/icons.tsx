import { StyleProp, ViewStyle } from 'react-native'
import Svg, { Path, Rect, Line, Ellipse } from 'react-native-svg'

export function HomeIcon({
  style,
  size,
  strokeWidth = 4,
}: {
  style?: StyleProp<ViewStyle>
  size?: string | number
  strokeWidth?: number
}) {
  return (
    <Svg
      viewBox="0 0 48 48"
      width={size || 24}
      height={size || 24}
      stroke="currentColor"
      fill="none"
      style={style}>
      <Path
        strokeWidth={strokeWidth}
        d="M 23.951 2 C 23.631 2.011 23.323 2.124 23.072 2.322 L 8.859 13.52 C 7.055 14.941 6 17.114 6 19.41 L 6 38.5 C 6 39.864 7.136 41 8.5 41 L 18.5 41 C 19.864 41 21 39.864 21 38.5 L 21 28.5 C 21 28.205 21.205 28 21.5 28 L 26.5 28 C 26.795 28 27 28.205 27 28.5 L 27 38.5 C 27 39.864 28.136 41 29.5 41 L 39.5 41 C 40.864 41 42 39.864 42 38.5 L 42 19.41 C 42 17.114 40.945 14.941 39.141 13.52 L 24.928 2.322 C 24.65 2.103 24.304 1.989 23.951 2 Z"
      />
    </Svg>
  )
}

export function HomeIconSolid({
  style,
  size,
  strokeWidth = 4,
}: {
  style?: StyleProp<ViewStyle>
  size?: string | number
  strokeWidth?: number
}) {
  return (
    <Svg
      viewBox="0 0 48 48"
      width={size || 24}
      height={size || 24}
      stroke="currentColor"
      style={style}>
      <Path
        fill="currentColor"
        strokeWidth={strokeWidth}
        d="m 23.951,2 c -0.32,0.011 -0.628,0.124 -0.879,0.322 L 8.859,13.52 C 7.055,14.941 6,17.114 6,19.41 V 38.5 C 6,39.864 7.136,41 8.5,41 h 8 c 1.364,0 2.5,-1.136 2.5,-2.5 v -12 C 19,26.205 19.205,26 19.5,26 h 9 c 0.295,0 0.5,0.205 0.5,0.5 v 12 c 0,1.364 1.136,2.5 2.5,2.5 h 8 C 40.864,41 42,39.864 42,38.5 V 19.41 c 0,-2.296 -1.055,-4.469 -2.859,-5.89 L 24.928,2.322 C 24.65,2.103 24.304,1.989 23.951,2 Z"
      />
    </Svg>
  )
}

export function ReceiptIconSolid({
  style,
  size,
  strokeWidth = 4,
}: {
  style?: StyleProp<ViewStyle>
  size?: string | number
  strokeWidth?: number
}) {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size || 24}
      height={size || 24}
      style={style}>
      <Path
        fill="currentColor"
        strokeWidth={strokeWidth}
        d="M9 4L6 2L3 4V16V19C3 20.6569 4.34315 22 6 22H20C21.6569 22 23 20.6569 23 19V17H7V19C7 19.5523 6.55228 20 6 20C5.44772 20 5 19.5523 5 19V15H21V4L18 2L15 4L12 2L9 4Z"></Path>
    </Svg>
  )
}
export function ReceiptIcon({
  style,
  size,
  strokeWidth = 4,
}: {
  style?: StyleProp<ViewStyle>
  size?: string | number
  strokeWidth?: number
}) {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size || 24}
      height={size || 24}
      style={style}
      strokeWidth={strokeWidth}>
      <Path
        fill="currentColor"
        strokeWidth={strokeWidth}
        d="M9 4L6 2L3 4V19C3 20.6569 4.34315 22 6 22H20C21.6569 22 23 20.6569 23 19V16H21V4L18 2L15 4L12 2L9 4ZM19 16H7V19C7 19.5523 6.55228 20 6 20C5.44772 20 5 19.5523 5 19V5.07037L6 4.4037L9 6.4037L12 4.4037L15 6.4037L18 4.4037L19 5.07037V16ZM20 20H8.82929C8.93985 19.6872 9 19.3506 9 19V18H21V19C21 19.5523 20.5523 20 20 20Z"></Path>
    </Svg>
  )
}

export function OrderIcon({
  style,
  size,
  strokeWidth,
}: {
  style?: StyleProp<ViewStyle>
  size?: string | number
  strokeWidth?: number
}) {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      width={size || 24}
      height={size || 24}
      strokeWidth={strokeWidth}
      style={style}>
      <Path
        fill="currentColor"
        d="M20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM19 20V4H5V20H19ZM8 7H16V9H8V7ZM8 11H16V13H8V11ZM8 15H13V17H8V15Z"></Path>
    </Svg>
  )
}

export function OrderIconSolid({
  strokeWidth,
  style,
  size,
}: {
  style?: StyleProp<ViewStyle>
  size?: string | number
  strokeWidth?: number
}) {
  return (
    <Svg
      viewBox="0 0 24 24"
      height={size || 24}
      width={size || 24}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}>
      <Path
        fill="currentColor"
        d="M20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM8 7V9H16V7H8ZM8 11V13H16V11H8ZM8 15V17H13V15H8Z"></Path>
    </Svg>
  )
}

// Copyright (c) 2020 Refactoring UI Inc.
// https://github.com/tailwindlabs/heroicons/blob/master/LICENSE
export function MagnifyingGlassIcon({
  style,
  size,
  strokeWidth = 2,
}: {
  style?: StyleProp<ViewStyle>
  size?: string | number
  strokeWidth?: number
}) {
  return (
    <Svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      width={size || 24}
      height={size || 24}
      style={style}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </Svg>
  )
}

export function MagnifyingGlassIcon2({
  style,
  size,
  strokeWidth = 2,
  color = '#000',
}: {
  style?: StyleProp<ViewStyle>
  size?: string | number
  strokeWidth?: number
  color?: string
}) {
  return (
    <Svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      color={color}
      width={size || 24}
      height={size || 24}
      style={style}>
      <Ellipse cx="12" cy="11" rx="9" ry="9" />
      <Line x1="19" y1="17.3" x2="23.5" y2="21" strokeLinecap="round" />
    </Svg>
  )
}

export function MagnifyingGlassIcon2Solid({
  style,
  size,
  strokeWidth = 2,
}: {
  style?: StyleProp<ViewStyle>
  size?: string | number
  strokeWidth?: number
}) {
  return (
    <Svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      width={size || 24}
      height={size || 24}
      style={style}>
      <Ellipse
        cx="12"
        cy="11"
        rx="7"
        ry="7"
        stroke="none"
        fill="currentColor"
      />
      <Ellipse cx="12" cy="11" rx="9" ry="9" />
      <Line x1="19" y1="17.3" x2="23.5" y2="21" strokeLinecap="round" />
    </Svg>
  )
}

export function OrdersIcon({
  size,
  strokeWidth,
  style,
}: {
  style?: StyleProp<ViewStyle>
  size?: string | number
  strokeWidth?: number
}) {
  return (
    <Svg
      viewBox="0 0 24 24"
      height={size || 24}
      width={size || 24}
      fill="currentColor"
      strokeWidth={strokeWidth}
      style={style}>
      <Path fill="none" d="M0 0h24v24H0z"></Path>
      <Path d="M20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM19 20V4H5V20H19ZM8 7H16V9H8V7ZM8 11H16V13H8V11ZM8 15H13V17H8V15Z"></Path>
    </Svg>
  )
}
export function OrdersIconSolid({
  size,
  strokeWidth,
  style,
}: {
  style?: StyleProp<ViewStyle>
  size?: string | number
  strokeWidth?: number
}) {
  return (
    <Svg
      viewBox="0 0 24 24"
      height={size || 24}
      width={size || 24}
      fill="currentColor"
      strokeWidth={strokeWidth}
      style={style}>
      <Path fill="none" d="M0 0h24v24H0z"></Path>
      <Path d="M20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM8 7V9H16V7H8ZM8 11V13H16V11H8ZM8 15V17H13V15H8Z"></Path>
    </Svg>
  )
}

export function StoreIcon({
  size,
  strokeWidth,
  style,
}: {
  style?: StyleProp<ViewStyle>
  size?: string | number
  strokeWidth?: number
}) {
  return (
    <Svg
      viewBox="0 0 24 24"
      height={size || 24}
      width={size || 24}
      fill="currentColor"
      style={style}>
      <Path d="M21 13.2422V20H22V22H2V20H3V13.2422C1.79401 12.435 1 11.0602 1 9.5C1 8.67286 1.22443 7.87621 1.63322 7.19746L4.3453 2.5C4.52393 2.1906 4.85406 2 5.21132 2H18.7887C19.1459 2 19.4761 2.1906 19.6547 2.5L22.3575 7.18172C22.7756 7.87621 23 8.67286 23 9.5C23 11.0602 22.206 12.435 21 13.2422ZM19 13.9725C18.8358 13.9907 18.669 14 18.5 14C17.2409 14 16.0789 13.478 15.25 12.6132C14.4211 13.478 13.2591 14 12 14C10.7409 14 9.5789 13.478 8.75 12.6132C7.9211 13.478 6.75911 14 5.5 14C5.331 14 5.16417 13.9907 5 13.9725V20H19V13.9725ZM5.78865 4L3.35598 8.21321C3.12409 8.59843 3 9.0389 3 9.5C3 10.8807 4.11929 12 5.5 12C6.53096 12 7.44467 11.3703 7.82179 10.4295C8.1574 9.59223 9.3426 9.59223 9.67821 10.4295C10.0553 11.3703 10.969 12 12 12C13.031 12 13.9447 11.3703 14.3218 10.4295C14.6574 9.59223 15.8426 9.59223 16.1782 10.4295C16.5553 11.3703 17.469 12 18.5 12C19.8807 12 21 10.8807 21 9.5C21 9.0389 20.8759 8.59843 20.6347 8.19746L18.2113 4H5.78865Z"></Path>
    </Svg>
  )
}

export function StoreIconSolid({
  size,
  strokeWidth,
  style,
}: {
  style?: StyleProp<ViewStyle>
  size?: string | number
  strokeWidth?: number
}) {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height={size || 24}
      width={size || 24}
      style={style}>
      <Path d="M22 20V22H2V20H3V13.2422C1.79401 12.435 1 11.0602 1 9.5C1 8.67286 1.22443 7.87621 1.63322 7.19746L4.3453 2.5C4.52393 2.1906 4.85406 2 5.21132 2H18.7887C19.1459 2 19.4761 2.1906 19.6547 2.5L22.3575 7.18172C22.7756 7.87621 23 8.67286 23 9.5C23 11.0602 22.206 12.435 21 13.2422V20H22ZM5.78865 4L3.35598 8.21321C3.12409 8.59843 3 9.0389 3 9.5C3 10.8807 4.11929 12 5.5 12C6.53096 12 7.44467 11.3703 7.82179 10.4295C8.1574 9.59223 9.3426 9.59223 9.67821 10.4295C10.0553 11.3703 10.969 12 12 12C13.031 12 13.9447 11.3703 14.3218 10.4295C14.6574 9.59223 15.8426 9.59223 16.1782 10.4295C16.5553 11.3703 17.469 12 18.5 12C19.8807 12 21 10.8807 21 9.5C21 9.0389 20.8759 8.59843 20.6347 8.19746L18.2113 4H5.78865Z"></Path>
    </Svg>
  )
}

export function MyAccountIcon({
  size,
  strokeWidth,
  style,
}: {
  size?: string | number
  style?: StyleProp<ViewStyle>
  strokeWidth?: number
}) {
  return (
    <Svg
      fill="none"
      viewBox="0 0 24 24"
      stroke-width={strokeWidth ?? '1.5'}
      height={size || 24}
      width={size || 24}
      stroke="currentColor"
      style={style}>
      <Path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </Svg>
  )
}

export function MyAccountIconSolid({
  size,
  strokeWidth,
  style,
}: {
  size?: string | number
  style?: StyleProp<ViewStyle>
  strokeWidth?: number
}) {
  return (
    <Svg
      stroke-width={strokeWidth ?? '1.5'}
      height={size || 24}
      width={size || 24}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={style}>
      <Path
        fill-rule="evenodd"
        d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
        clip-rule="evenodd"
      />
    </Svg>
  )
}

export function ServicesIcon({
  size,
  style,
  strokeWidth,
}: {
  size?: string | number
  style?: StyleProp<ViewStyle>
  strokeWidth?: number
}) {
  return (
    <Svg
      fill="none"
      viewBox="0 0 24 24"
      height={size || 24}
      width={size || 24}
      stroke-width={strokeWidth ?? 1.5}
      stroke="currentColor"
      style={style}>
      <Path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
      />
    </Svg>
  )
}

export function ServicesIconSolid({
  size,
  style,
  strokeWidth,
}: {
  size?: string | number
  style?: StyleProp<ViewStyle>
  strokeWidth?: number
}) {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height={size || 24}
      width={size || 24}
      strokeWidth={strokeWidth}
      style={style}>
      <Path
        fillRule="evenodd"
        d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z"
        clipRule="evenodd"
      />
      <Path d="m10.076 8.64-2.201-2.2V4.874a.75.75 0 0 0-.364-.643l-3.75-2.25a.75.75 0 0 0-.916.113l-.75.75a.75.75 0 0 0-.113.916l2.25 3.75a.75.75 0 0 0 .643.364h1.564l2.062 2.062 1.575-1.297Z" />
      <Path
        fillRule="evenodd"
        d="m12.556 17.329 4.183 4.182a3.375 3.375 0 0 0 4.773-4.773l-3.306-3.305a6.803 6.803 0 0 1-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 0 0-.167.063l-3.086 3.748Zm3.414-1.36a.75.75 0 0 1 1.06 0l1.875 1.876a.75.75 0 1 1-1.06 1.06L15.97 17.03a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </Svg>
  )
}

export function PartsIcon({
  size,
  strokeWidth,
  style,
}: {
  size?: string | number
  style?: StyleProp<ViewStyle>
  strokeWidth?: number
}) {
  return (
    <Svg
      fill="none"
      viewBox="0 0 24 24"
      height={size || 24}
      width={size || 24}
      strokeWidth={strokeWidth || 1.5}
      stroke="currentColor"
      style={style}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
      />
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </Svg>
  )
}

export function PartsIconSolid({
  size,
  strokeWidth,
  style,
}: {
  size?: string | number
  style?: StyleProp<ViewStyle>
  strokeWidth?: number
}) {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height={size || 24}
      width={size || 24}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      style={style}>
      <Path
        fillRule="evenodd"
        d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
        clipRule="evenodd"
      />
    </Svg>
  )
}
