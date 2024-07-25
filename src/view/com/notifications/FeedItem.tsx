import React, {useCallback, useState} from 'react'
import {View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {
  FeedNotification,
  NotifCategoryType,
} from '#/state/queries/notifications/types'
import {NavigationProp} from '#/lib/routes/types'
import {color} from '#/theme/tokens'
import {HStack} from '#/components/HStack'
import {Text} from '#/components/Typography'
import {useGetTimeAgo} from '#/lib/hooks/useTimeAgo'
import {useTheme, atoms as a} from '#/theme'
import {Calendar, FileSliders, Star, Store, Wrench} from 'lucide-react-native'

export function FeedItem({feed}: {feed: FeedNotification}) {
  const t = useTheme()
  const [now] = useState(() => Date.now())
  const navigation = useNavigation<NavigationProp>()
  const timeAgo = useGetTimeAgo()
  const onPress = useCallback(() => {
    if (feed.category.display_name == 'Order') {
      navigation.navigate('OrderDetails', {id: feed.metadata?.order_id})
    }
  }, [navigation, feed])

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        a.p_xs,
        a.border,
        t.atoms.border_contrast_low,
        {backgroundColor: feed.is_read ? '#fff' : color.blue_25},
      ]}>
      <HStack style={[a.gap_2xs, a.align_center, a.justify_center]}>
        <NotifCategoryIcon
          name={feed.sub_category?.name ?? feed.category.name}
        />
        <Text style={[a.flex_1, t.atoms.text_contrast_medium, a.font_semibold]}>
          {feed.sub_category?.display_name ?? feed.category.display_name}
        </Text>
        <Text style={[t.atoms.text_contrast_medium]}>
          {timeAgo(feed.created_at, now, {format: 'long'})}
        </Text>
      </HStack>
      <View style={[a.pt_2xs]}>
        <Text style={[a.font_bold]}>{feed.title}</Text>
        {feed.description ? (
          <Text style={[{paddingVertical: 2}]}>{feed.description}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  )
}

function NotifCategoryIcon({name}: {name: NotifCategoryType | string}) {
  const t = useTheme()
  let icon

  switch (name) {
    case 'Important':
      icon = <Star color={t.palette.contrast_700} size={14} />
      break
    case 'Order':
    case 'Cancelled Order':
    case 'New Order':
      icon = <Calendar color={t.palette.contrast_700} size={14} />

      break
    case 'Store':
      icon = <Store color={t.palette.contrast_700} size={14} />
      break
    case 'Updates':
      icon = <FileSliders color={t.palette.contrast_700} size={14} />
      break
    case 'Services':
      icon = <Wrench color={t.palette.contrast_700} size={14} />
      break
    default:
  }

  return <View style={[{padding: 2}]}>{icon}</View>
}
