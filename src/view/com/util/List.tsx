import React, {memo} from 'react'
import {FlatListProps, RefreshControl, ViewToken} from 'react-native'
import {runOnJS, useSharedValue} from 'react-native-reanimated'

import {addStyle} from 'lib/styles'
import {FlatList_INTERNAL} from './Views'

export type ListMethods = FlatList_INTERNAL
export type ListProps<ItemT> = Omit<
  FlatListProps<ItemT>,
  | 'onMomentumScrollBegin' // Use ScrollContext instead.
  | 'onMomentumScrollEnd' // Use ScrollContext instead.
  | 'onScroll' // Use ScrollContext instead.
  | 'onScrollBeginDrag' // Use ScrollContext instead.
  | 'onScrollEndDrag' // Use ScrollContext instead.
  | 'refreshControl' // Pass refreshing and/or onRefresh instead.
  | 'contentOffset' // Pass headerOffset instead.
> & {
  onScrolledDownChange?: (isScrolledDown: boolean) => void
  headerOffset?: number
  refreshing?: boolean
  onRefresh?: () => void
  onItemSeen?: (item: ItemT) => void
  desktopFixedHeight?: number | boolean
  // Web only prop to contain the scroll to the container rather than the window
  disableFullWindowScroll?: boolean
  sideBorders?: boolean
  // Web only prop to disable a perf optimization (which would otherwise be on).
  disableContainStyle?: boolean
}
export type ListRef = React.MutableRefObject<FlatList_INTERNAL | null>

const SCROLLED_DOWN_LIMIT = 200

function ListImpl<ItemT>(
  {
    onScrolledDownChange,
    refreshing,
    onRefresh,
    onItemSeen,
    headerOffset,
    style,
    ...props
  }: ListProps<ItemT>,
  ref: React.Ref<ListMethods>,
) {
  const [onViewableItemsChanged, viewabilityConfig] = React.useMemo(() => {
    if (!onItemSeen) {
      return [undefined, undefined]
    }
    return [
      (info: {viewableItems: Array<ViewToken>; changed: Array<ViewToken>}) => {
        for (const item of info.changed) {
          if (item.isViewable) {
            onItemSeen(item.item)
          }
        }
      },
      {
        itemVisiblePercentThreshold: 40,
        minimumViewTime: 1.5e3,
      },
    ]
  }, [onItemSeen])

  let refreshControl
  if (refreshing !== undefined || onRefresh !== undefined) {
    refreshControl = (
      <RefreshControl
        refreshing={refreshing ?? false}
        onRefresh={onRefresh}
        tintColor={'#000'}
        titleColor={'#000'}
        progressViewOffset={headerOffset}
      />
    )
  }

  let contentOffset
  if (headerOffset != null) {
    style = addStyle(style, {
      paddingTop: headerOffset,
    })
    contentOffset = {x: 0, y: headerOffset * -1}
  }

  return (
    <FlatList_INTERNAL
      {...props}
      scrollIndicatorInsets={{right: 1}}
      contentOffset={contentOffset}
      refreshControl={refreshControl}
      scrollEventThrottle={1}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      style={style}
      ref={ref}
    />
  )
}

export const List = memo(React.forwardRef(ListImpl)) as <ItemT>(
  props: ListProps<ItemT> & {ref?: React.Ref<ListMethods>},
) => React.ReactElement
