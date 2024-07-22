import * as tokens from '#/theme/tokens'
import { atoms } from '#/theme/atoms'
import { BLUE_HUE, GREEN_HUE, RED_HUE } from './util/colorGeneration'
import { Mutable } from '#/theme/types'
export type ThemeName = 'light' | 'dark' | 'dim'
export type ReadonlyTheme = typeof light
export type Theme = Mutable<ReadonlyTheme>
export type ReadonlyPalette = typeof lightPalette
export type Palette = Mutable<ReadonlyPalette>

export const lightPalette = {
  white: tokens.color.gray_0,
  black: tokens.color.gray_1000,

  contrast_25: tokens.color.gray_25,
  contrast_50: tokens.color.gray_50,
  contrast_100: tokens.color.gray_100,
  contrast_200: tokens.color.gray_200,
  contrast_300: tokens.color.gray_300,
  contrast_400: tokens.color.gray_400,
  contrast_500: tokens.color.gray_500,
  contrast_600: tokens.color.gray_600,
  contrast_700: tokens.color.gray_700,
  contrast_800: tokens.color.gray_800,
  contrast_900: tokens.color.gray_900,
  contrast_950: tokens.color.gray_950,
  contrast_975: tokens.color.gray_975,

  primary_25: tokens.color.black_25,
  primary_50: tokens.color.black_50,
  primary_100: tokens.color.black_100,
  primary_200: tokens.color.black_200,
  primary_300: tokens.color.black_300,
  primary_400: tokens.color.black_400,
  primary_500: tokens.color.black_500,
  primary_600: tokens.color.black_600,
  primary_700: tokens.color.black_700,
  primary_800: tokens.color.black_800,
  primary_900: tokens.color.black_900,
  primary_950: tokens.color.black_950,
  primary_975: tokens.color.black_975,

  blue_25: tokens.color.blue_25,
  blue_50: tokens.color.blue_50,
  blue_100: tokens.color.blue_100,
  blue_200: tokens.color.blue_200,
  blue_300: tokens.color.blue_300,
  blue_400: tokens.color.blue_400,
  blue_500: tokens.color.blue_500,
  blue_600: tokens.color.blue_600,
  blue_700: tokens.color.blue_700,
  blue_800: tokens.color.blue_800,
  blue_900: tokens.color.blue_900,
  blue_950: tokens.color.blue_950,
  blue_975: tokens.color.blue_975,

  positive_25: tokens.color.green_25,
  positive_50: tokens.color.green_50,
  positive_100: tokens.color.green_100,
  positive_200: tokens.color.green_200,
  positive_300: tokens.color.green_300,
  positive_400: tokens.color.green_400,
  positive_500: tokens.color.green_500,
  positive_600: tokens.color.green_600,
  positive_700: tokens.color.green_700,
  positive_800: tokens.color.green_800,
  positive_900: tokens.color.green_900,
  positive_950: tokens.color.green_950,
  positive_975: tokens.color.green_975,

  negative_25: tokens.color.red_25,
  negative_50: tokens.color.red_50,
  negative_100: tokens.color.red_100,
  negative_200: tokens.color.red_200,
  negative_300: tokens.color.red_300,
  negative_400: tokens.color.red_400,
  negative_500: tokens.color.red_500,
  negative_600: tokens.color.red_600,
  negative_700: tokens.color.red_700,
  negative_800: tokens.color.red_800,
  negative_900: tokens.color.red_900,
  negative_950: tokens.color.red_950,
  negative_975: tokens.color.red_975,
} as const

export const darkPalette: Palette = {
  white: tokens.color.gray_0,
  black: tokens.color.trueBlack,

  contrast_25: tokens.color.gray_1000,
  contrast_50: tokens.color.gray_975,
  contrast_100: tokens.color.gray_950,
  contrast_200: tokens.color.gray_900,
  contrast_300: tokens.color.gray_800,
  contrast_400: tokens.color.gray_700,
  contrast_500: tokens.color.gray_600,
  contrast_600: tokens.color.gray_500,
  contrast_700: tokens.color.gray_400,
  contrast_800: tokens.color.gray_300,
  contrast_900: tokens.color.gray_200,
  contrast_950: tokens.color.gray_100,
  contrast_975: tokens.color.gray_50,

  primary_25: tokens.color.black_25,
  primary_50: tokens.color.black_50,
  primary_100: tokens.color.black_100,
  primary_200: tokens.color.black_200,
  primary_300: tokens.color.black_300,
  primary_400: tokens.color.black_400,
  primary_500: tokens.color.black_500,
  primary_600: tokens.color.black_600,
  primary_700: tokens.color.black_700,
  primary_800: tokens.color.black_800,
  primary_900: tokens.color.black_900,
  primary_950: tokens.color.black_950,
  primary_975: tokens.color.black_975,

  blue_25: tokens.color.blue_25,
  blue_50: tokens.color.blue_50,
  blue_100: tokens.color.blue_100,
  blue_200: tokens.color.blue_200,
  blue_300: tokens.color.blue_300,
  blue_400: tokens.color.blue_400,
  blue_500: tokens.color.blue_500,
  blue_600: tokens.color.blue_600,
  blue_700: tokens.color.blue_700,
  blue_800: tokens.color.blue_800,
  blue_900: tokens.color.blue_900,
  blue_950: tokens.color.blue_950,
  blue_975: tokens.color.blue_975,

  positive_25: tokens.color.green_25,
  positive_50: tokens.color.green_50,
  positive_100: tokens.color.green_100,
  positive_200: tokens.color.green_200,
  positive_300: tokens.color.green_300,
  positive_400: tokens.color.green_400,
  positive_500: tokens.color.green_500,
  positive_600: tokens.color.green_600,
  positive_700: tokens.color.green_700,
  positive_800: tokens.color.green_800,
  positive_900: tokens.color.green_900,
  positive_950: tokens.color.green_950,
  positive_975: tokens.color.green_975,

  negative_25: tokens.color.red_25,
  negative_50: tokens.color.red_50,
  negative_100: tokens.color.red_100,
  negative_200: tokens.color.red_200,
  negative_300: tokens.color.red_300,
  negative_400: tokens.color.red_400,
  negative_500: tokens.color.red_500,
  negative_600: tokens.color.red_600,
  negative_700: tokens.color.red_700,
  negative_800: tokens.color.red_800,
  negative_900: tokens.color.red_900,
  negative_950: tokens.color.red_950,
  negative_975: tokens.color.red_975,
} as const

export const dimPalette: Palette = {
  ...darkPalette,
  black: `hsl(${BLUE_HUE}, 28%, ${tokens.dimScale[0]}%)`,

  contrast_25: `hsl(${BLUE_HUE}, 28%, ${tokens.dimScale[1]}%)`,
  contrast_50: `hsl(${BLUE_HUE}, 28%, ${tokens.dimScale[2]}%)`,
  contrast_100: `hsl(${BLUE_HUE}, 28%, ${tokens.dimScale[3]}%)`,
  contrast_200: `hsl(${BLUE_HUE}, 28%, ${tokens.dimScale[4]}%)`,
  contrast_300: `hsl(${BLUE_HUE}, 24%, ${tokens.dimScale[5]}%)`,
  contrast_400: `hsl(${BLUE_HUE}, 24%, ${tokens.dimScale[6]}%)`,
  contrast_500: `hsl(${BLUE_HUE}, 20%, ${tokens.dimScale[7]}%)`,
  contrast_600: `hsl(${BLUE_HUE}, 20%, ${tokens.dimScale[8]}%)`,
  contrast_700: `hsl(${BLUE_HUE}, 20%, ${tokens.dimScale[9]}%)`,
  contrast_800: `hsl(${BLUE_HUE}, 20%, ${tokens.dimScale[10]}%)`,
  contrast_900: `hsl(${BLUE_HUE}, 20%, ${tokens.dimScale[11]}%)`,
  contrast_950: `hsl(${BLUE_HUE}, 20%, ${tokens.dimScale[12]}%)`,
  contrast_975: `hsl(${BLUE_HUE}, 20%, ${tokens.dimScale[13]}%)`,

  primary_25: `hsl(${BLUE_HUE}, 99%, ${tokens.dimScale[13]}%)`,
  primary_50: `hsl(${BLUE_HUE}, 99%, ${tokens.dimScale[12]}%)`,
  primary_100: `hsl(${BLUE_HUE}, 99%, ${tokens.dimScale[11]}%)`,
  primary_200: `hsl(${BLUE_HUE}, 99%, ${tokens.dimScale[10]}%)`,
  primary_300: `hsl(${BLUE_HUE}, 99%, ${tokens.dimScale[9]}%)`,
  primary_400: `hsl(${BLUE_HUE}, 99%, ${tokens.dimScale[8]}%)`,
  primary_500: `hsl(${BLUE_HUE}, 99%, ${tokens.dimScale[7]}%)`,
  primary_600: `hsl(${BLUE_HUE}, 95%, ${tokens.dimScale[6]}%)`,
  primary_700: `hsl(${BLUE_HUE}, 90%, ${tokens.dimScale[5]}%)`,
  primary_800: `hsl(${BLUE_HUE}, 82%, ${tokens.dimScale[4]}%)`,
  primary_900: `hsl(${BLUE_HUE}, 70%, ${tokens.dimScale[3]}%)`,
  primary_950: `hsl(${BLUE_HUE}, 60%, ${tokens.dimScale[2]}%)`,
  primary_975: `hsl(${BLUE_HUE}, 50%, ${tokens.dimScale[1]}%)`,

  positive_25: `hsl(${GREEN_HUE}, 82%, ${tokens.dimScale[13]}%)`,
  positive_50: `hsl(${GREEN_HUE}, 82%, ${tokens.dimScale[12]}%)`,
  positive_100: `hsl(${GREEN_HUE}, 82%, ${tokens.dimScale[11]}%)`,
  positive_200: `hsl(${GREEN_HUE}, 82%, ${tokens.dimScale[10]}%)`,
  positive_300: `hsl(${GREEN_HUE}, 82%, ${tokens.dimScale[9]}%)`,
  positive_400: `hsl(${GREEN_HUE}, 82%, ${tokens.dimScale[8]}%)`,
  positive_500: `hsl(${GREEN_HUE}, 82%, ${tokens.dimScale[7]}%)`,
  positive_600: `hsl(${GREEN_HUE}, 82%, ${tokens.dimScale[6]}%)`,
  positive_700: `hsl(${GREEN_HUE}, 82%, ${tokens.dimScale[5]}%)`,
  positive_800: `hsl(${GREEN_HUE}, 82%, ${tokens.dimScale[4]}%)`,
  positive_900: `hsl(${GREEN_HUE}, 70%, ${tokens.dimScale[3]}%)`,
  positive_950: `hsl(${GREEN_HUE}, 60%, ${tokens.dimScale[2]}%)`,
  positive_975: `hsl(${GREEN_HUE}, 50%, ${tokens.dimScale[1]}%)`,

  negative_25: `hsl(${RED_HUE}, 91%, ${tokens.dimScale[13]}%)`,
  negative_50: `hsl(${RED_HUE}, 91%, ${tokens.dimScale[12]}%)`,
  negative_100: `hsl(${RED_HUE}, 91%, ${tokens.dimScale[11]}%)`,
  negative_200: `hsl(${RED_HUE}, 91%, ${tokens.dimScale[10]}%)`,
  negative_300: `hsl(${RED_HUE}, 91%, ${tokens.dimScale[9]}%)`,
  negative_400: `hsl(${RED_HUE}, 91%, ${tokens.dimScale[8]}%)`,
  negative_500: `hsl(${RED_HUE}, 91%, ${tokens.dimScale[7]}%)`,
  negative_600: `hsl(${RED_HUE}, 91%, ${tokens.dimScale[6]}%)`,
  negative_700: `hsl(${RED_HUE}, 91%, ${tokens.dimScale[5]}%)`,
  negative_800: `hsl(${RED_HUE}, 88%, ${tokens.dimScale[4]}%)`,
  negative_900: `hsl(${RED_HUE}, 84%, ${tokens.dimScale[3]}%)`,
  negative_950: `hsl(${RED_HUE}, 80%, ${tokens.dimScale[2]}%)`,
  negative_975: `hsl(${RED_HUE}, 70%, ${tokens.dimScale[1]}%)`,
} as const

export const light = {
  name: 'light',
  palette: lightPalette,
  atoms: {
    text: {
      color: lightPalette.black,
    },
    text_contrast_low: {
      color: lightPalette.contrast_400,
    },
    text_contrast_medium: {
      color: lightPalette.contrast_700,
    },
    text_contrast_high: {
      color: lightPalette.contrast_900,
    },
    text_inverted: {
      color: lightPalette.white,
    },
    bg: {
      backgroundColor: lightPalette.white,
    },
    bg_contrast_25: {
      backgroundColor: lightPalette.contrast_25,
    },
    bg_contrast_50: {
      backgroundColor: lightPalette.contrast_50,
    },
    bg_contrast_100: {
      backgroundColor: lightPalette.contrast_100,
    },
    bg_contrast_200: {
      backgroundColor: lightPalette.contrast_200,
    },
    bg_contrast_300: {
      backgroundColor: lightPalette.contrast_300,
    },
    bg_contrast_400: {
      backgroundColor: lightPalette.contrast_400,
    },
    bg_contrast_500: {
      backgroundColor: lightPalette.contrast_500,
    },
    bg_contrast_600: {
      backgroundColor: lightPalette.contrast_600,
    },
    bg_contrast_700: {
      backgroundColor: lightPalette.contrast_700,
    },
    bg_contrast_800: {
      backgroundColor: lightPalette.contrast_800,
    },
    bg_contrast_900: {
      backgroundColor: lightPalette.contrast_900,
    },
    bg_contrast_950: {
      backgroundColor: lightPalette.contrast_950,
    },
    bg_contrast_975: {
      backgroundColor: lightPalette.contrast_975,
    },
    border_contrast_low: {
      borderColor: lightPalette.contrast_100,
    },
    border_contrast_medium: {
      borderColor: lightPalette.contrast_200,
    },
    border_contrast_high: {
      borderColor: lightPalette.contrast_300,
    },
    shadow_sm: {
      ...atoms.shadow_sm,
      shadowColor: lightPalette.black,
    },
    shadow_md: {
      ...atoms.shadow_md,
      shadowColor: lightPalette.black,
    },
    shadow_lg: {
      ...atoms.shadow_lg,
      shadowColor: lightPalette.black,
    },
  },
}

export const dark: Theme = {
  name: 'dark',
  palette: lightPalette,
  atoms: {
    text: {
      color: lightPalette.black,
    },
    text_contrast_low: {
      color: lightPalette.contrast_400,
    },
    text_contrast_medium: {
      color: lightPalette.contrast_700,
    },
    text_contrast_high: {
      color: lightPalette.contrast_900,
    },
    text_inverted: {
      color: lightPalette.white,
    },
    bg: {
      backgroundColor: lightPalette.white,
    },
    bg_contrast_25: {
      backgroundColor: lightPalette.contrast_25,
    },
    bg_contrast_50: {
      backgroundColor: lightPalette.contrast_50,
    },
    bg_contrast_100: {
      backgroundColor: lightPalette.contrast_100,
    },
    bg_contrast_200: {
      backgroundColor: lightPalette.contrast_200,
    },
    bg_contrast_300: {
      backgroundColor: lightPalette.contrast_300,
    },
    bg_contrast_400: {
      backgroundColor: lightPalette.contrast_400,
    },
    bg_contrast_500: {
      backgroundColor: lightPalette.contrast_500,
    },
    bg_contrast_600: {
      backgroundColor: lightPalette.contrast_600,
    },
    bg_contrast_700: {
      backgroundColor: lightPalette.contrast_700,
    },
    bg_contrast_800: {
      backgroundColor: lightPalette.contrast_800,
    },
    bg_contrast_900: {
      backgroundColor: lightPalette.contrast_900,
    },
    bg_contrast_950: {
      backgroundColor: lightPalette.contrast_950,
    },
    bg_contrast_975: {
      backgroundColor: lightPalette.contrast_975,
    },
    border_contrast_low: {
      borderColor: lightPalette.contrast_100,
    },
    border_contrast_medium: {
      borderColor: lightPalette.contrast_200,
    },
    border_contrast_high: {
      borderColor: lightPalette.contrast_300,
    },
    shadow_sm: {
      ...atoms.shadow_sm,
      shadowColor: lightPalette.black,
    },
    shadow_md: {
      ...atoms.shadow_md,
      shadowColor: lightPalette.black,
    },
    shadow_lg: {
      ...atoms.shadow_lg,
      shadowColor: lightPalette.black,
    },
  },
}

export const dim: Theme = {
  ...dark,
  name: 'dim',
  palette: lightPalette,
  atoms: {
    text: {
      color: lightPalette.black,
    },
    text_contrast_low: {
      color: lightPalette.contrast_400,
    },
    text_contrast_medium: {
      color: lightPalette.contrast_700,
    },
    text_contrast_high: {
      color: lightPalette.contrast_900,
    },
    text_inverted: {
      color: lightPalette.white,
    },
    bg: {
      backgroundColor: lightPalette.white,
    },
    bg_contrast_25: {
      backgroundColor: lightPalette.contrast_25,
    },
    bg_contrast_50: {
      backgroundColor: lightPalette.contrast_50,
    },
    bg_contrast_100: {
      backgroundColor: lightPalette.contrast_100,
    },
    bg_contrast_200: {
      backgroundColor: lightPalette.contrast_200,
    },
    bg_contrast_300: {
      backgroundColor: lightPalette.contrast_300,
    },
    bg_contrast_400: {
      backgroundColor: lightPalette.contrast_400,
    },
    bg_contrast_500: {
      backgroundColor: lightPalette.contrast_500,
    },
    bg_contrast_600: {
      backgroundColor: lightPalette.contrast_600,
    },
    bg_contrast_700: {
      backgroundColor: lightPalette.contrast_700,
    },
    bg_contrast_800: {
      backgroundColor: lightPalette.contrast_800,
    },
    bg_contrast_900: {
      backgroundColor: lightPalette.contrast_900,
    },
    bg_contrast_950: {
      backgroundColor: lightPalette.contrast_950,
    },
    bg_contrast_975: {
      backgroundColor: lightPalette.contrast_975,
    },
    border_contrast_low: {
      borderColor: lightPalette.contrast_100,
    },
    border_contrast_medium: {
      borderColor: lightPalette.contrast_200,
    },
    border_contrast_high: {
      borderColor: lightPalette.contrast_300,
    },
    shadow_sm: {
      ...atoms.shadow_sm,
      shadowColor: lightPalette.black,
    },
    shadow_md: {
      ...atoms.shadow_md,
      shadowColor: lightPalette.black,
    },
    shadow_lg: {
      ...atoms.shadow_lg,
      shadowColor: lightPalette.black,
    },
  },
}
