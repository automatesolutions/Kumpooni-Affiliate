import React, {useCallback, useState} from 'react'
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {Check} from 'lucide-react-native'
import {Text} from '#/components/Typography'
import {useTheme, atoms as a} from '#/theme'
import {CommonNavigatorParams} from '#/lib/routes/types'
import {color} from '#/theme/tokens'
import {NotifUnreadCount} from '#/state/queries/notifications/types'
import {useIsFocused} from '@react-navigation/native'
import {listenSoftReset} from '#/state/events'
import {
  useUnreadNotifications,
  useUnreadNotificationsApi,
} from '#/state/queries/notifications/unread'
import {ActivityIndicator} from 'react-native-paper'
import {invalidateQuery} from '#/state/queries/util'
import {useQueryClient} from '@tanstack/react-query'
import {
  useNotificationCountQuery,
  RQKEY as RQKEY_NOTIFS,
} from '#/state/queries/notifications/count'
import {isNative} from '#/platform/detection'
import {Feed} from '#/view/com/notifications/Feed'

type Props = NativeStackScreenProps<CommonNavigatorParams, 'Notification'>

export type ListRef = React.MutableRefObject<FlatList | null>

export function NotificationScreen(props: Props) {
  const t = useTheme()
  const scrollElRef = React.useRef<FlatList>(null)

  const [category, setCategory] = useState<number>(2)
  const [isLoadingLatest, setIsLoadingLatest] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const unreadNum = useUnreadNotifications()
  const unreadApi = useUnreadNotificationsApi()
  const {data: dbCategory, error, isLoading} = useNotificationCountQuery()

  const scrollToTop = React.useCallback(() => {
    scrollElRef.current?.scrollToOffset({animated: isNative, offset: 0})
  }, [scrollElRef])

  const onPressLoadLatest = useCallback(() => {
    console.log('onPressLoadLatest is called')
    scrollToTop()

    if (unreadNum) {
      invalidateQuery(queryClient, RQKEY_NOTIFS())
    } else {
      // check with the server
      setIsLoadingLatest(true)
      unreadApi
        .checkUnreadMsgCount({invalidate: true})
        .catch(() => undefined)
        .then(() => setIsLoadingLatest(false))
    }
  }, [scrollToTop, category, unreadNum, unreadApi])

  const isScreenFocused = useIsFocused()

  const onMarkAllAsRead = useCallback(() => {
    unreadApi.markAllAsRead()
  }, [unreadApi])

  React.useEffect(() => {
    if (!isScreenFocused) {
      return
    }
    return listenSoftReset(onPressLoadLatest)
  }, [onPressLoadLatest, isScreenFocused])

  console.log('unreadNumb', unreadNum)
  return (
    <View style={[a.flex_1, t.atoms.bg_contrast_25, a.p_2xl]}>
      <View style={[a.flex_row, a.justify_between]}>
        <Text style={[a.text_xl, a.font_bold]}>Notification</Text>
        <TouchableOpacity
          disabled={!unreadNum}
          onPress={onMarkAllAsRead}
          style={[
            {paddingVertical: 4, paddingHorizontal: 8, gap: 4},
            a.flex_row,
            a.align_center,
            a.rounded_sm,
            !unreadNum ? t.atoms.bg_contrast_100 : t.atoms.bg,
          ]}>
          <Check size={a.text_xs.fontSize} color={t.palette.contrast_700} />
          <Text style={[a.text_xs, t.atoms.text_contrast_medium]}>
            Mark All as Read
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[a.flex_1, a.flex_row, a.flex_wrap, a.pt_2xs, a.gap_sm]}>
        <CategoryTab
          notifCategory={dbCategory}
          category={category}
          setCategory={setCategory}
        />
        <Feed categoryId={category} scrollElRef={scrollElRef} />
      </View>
    </View>
  )
}

function CategoryTab({
  notifCategory,
  category,
  setCategory,
}: {
  notifCategory?: NotifUnreadCount[] | null
  category: number
  setCategory: (v: number) => void
}) {
  const t = useTheme()
  console.log('notifCategory', notifCategory)
  // const {data: notifications} =
  if (!notifCategory) {
    return (
      <ActivityIndicator
        size={'small'}
        color="red"
        style={[
          t.atoms.bg,
          a.px_md,
          a.py_xl,
          a.rounded_md,
          a.gap_xs,
          a.h_full,
          {width: 270},
        ]}
      />
    )
  }
  return (
    <View
      style={[
        t.atoms.bg,
        a.px_md,
        a.py_xl,
        a.rounded_md,
        a.gap_xs,
        a.h_full,
        {width: 270},
      ]}>
      {notifCategory.map(notifCategory => {
        const isActive = category === notifCategory.category_id
        return (
          <TouchableOpacity
            onPress={() => setCategory(notifCategory.category_id)}
            style={[
              a.flex_row,
              a.gap_2xs,
              a.py_2xs,
              a.px_xs,
              a.align_center,
              a.rounded_sm,
              isActive ? styles.activeBtn : {},
            ]}
            key={notifCategory.category_id}>
            <Text style={[a.text_md, isActive ? styles.labelActive : {}]}>
              {notifCategory.display_name}
            </Text>
            {notifCategory.count > 0 ? (
              <View
                style={[
                  a.rounded_full,
                  a.justify_center,
                  a.align_center,
                  {
                    backgroundColor: color.red_500,
                    height: 16,
                    width: 16,
                  },
                ]}>
                <Text style={[a.text_xs, t.atoms.text_inverted]}>
                  {notifCategory.count}
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  activeBtn: {
    backgroundColor: color.blue_50,
  },
  labelActive: {
    color: color.blue_400,
  },
})
