import { color } from '#/theme/tokens'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'

export const FlatList_INTERNAL = Animated.FlatList
export function CenteredView(props) {
  return <View {...props} />
}

export function Separator(props) {
  return (
    <View
      style={[
        {
          height: 1,
          width: '100%',
          backgroundColor: color.gray_300,
        },
        props.style,
      ]}
    />
  )
}
