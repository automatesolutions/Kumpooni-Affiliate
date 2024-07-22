import { StyleProp, TextStyle } from 'react-native'
import { Text } from './Typography'
import { color } from '#/theme/tokens'

export function Required({ style }: { style?: StyleProp<TextStyle> }) {
  return (
    <Text
      style={[
        {
          color: color.red_500,
          fontWeight: 'bold',
        },
        style,
      ]}>
      *
    </Text>
  )
}
