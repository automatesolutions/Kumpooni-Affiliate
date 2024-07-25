import {logger} from '#/logger'
import {useNotificationByCategoryQuery} from '#/state/queries/notifications/feed'
import {useCallback, useState} from 'react'
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  View,
} from 'react-native'
import {FeedItem} from './FeedItem'

import {Text} from '#/components/Typography'
import {Button, ButtonText} from '#/components/Button'
import {ListRef} from '#/screens/Notification'
import {useSession} from '#/state/session'
import {useTheme, atoms as a} from '#/theme'
import {useUnreadNotificationsApi} from '#/state/queries/notifications/unread'
import {ListFooter} from '#/components/List'

export function Feed({
  categoryId,
  scrollElRef,
}: {
  categoryId: number
  scrollElRef?: ListRef
}) {
  const t = useTheme()
  const {session} = useSession()
  const [isPTRing, setIsPTRing] = useState(false)
  const {checkUnreadMsgCount} = useUnreadNotificationsApi()

  const {
    data: feed,
    isRefetching,
    isLoading,
    refetch,
  } = useNotificationByCategoryQuery({
    categoryId,
    storeId: session?.store_id,
  })

  const onRefresh = useCallback(async () => {
    try {
      setIsPTRing(true)
      await refetch()
      await checkUnreadMsgCount({invalidate: true})
    } catch (err) {
      logger.error('Failed to refresh notification feed', {message: err})
    } finally {
      setIsPTRing(false)
    }
  }, [])
  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<any>) => <FeedItem feed={item} />,
    [],
  )
  if (isLoading || isPTRing) {
    return (
      <ActivityIndicator
        size={'large'}
        color="red"
        style={[a.flex_1, a.justify_center, a.align_center, t.atoms.bg]}
      />
    )
  }
  if (!feed || !feed.length) {
    return <EmptyFeed onRefresh={onRefresh} />
  }
  return (
    // <View style={[a.flex_1, a.rounded_sm, t.atoms.bg, a.p_lg, a.self_start]}>
    //   <FeedItem />
    // </View>

    <FlatList
      ref={scrollElRef}
      onRefresh={onRefresh}
      refreshing={isPTRing}
      style={[t.atoms.bg, a.rounded_sm]}
      contentContainerStyle={[
        a.rounded_md,
        a.m_sm,
        a.overflow_hidden,
        // {borderWidth: 1},
        t.atoms.border_contrast_low,
      ]}
      data={feed}
      renderItem={renderItem}
      // ItemSeparatorComponent={() => (
      //   <View style={[{borderBottomWidth: 1}, t.atoms.border_contrast_low]} />
      // )}
      ListFooterComponent={<ListFooter endMessageText="" showEndMessage />}
    />
  )
}

function EmptyFeed({onRefresh}: {onRefresh: () => void}) {
  const t = useTheme()
  return (
    <View
      style={[
        a.flex_1,
        t.atoms.bg,
        a.justify_center,
        a.align_center,
        a.rounded_sm,
      ]}>
      <View style={[]}>
        <Text style={[a.text_2xl, a.font_bold]}>No data avaialable</Text>
        <Button
          onPress={onRefresh}
          variant="solid"
          color="primary_blue"
          label="Try Again"
          size="medium"
          style={[a.rounded_full, a.mt_2xl]}>
          <ButtonText>Try Again</ButtonText>
        </Button>
      </View>
    </View>
  )
}
