import React, {useCallback, useMemo} from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ListRenderItemInfo,
} from 'react-native'
import {Text} from '#/components/Typography'
import {useTheme, atoms as a} from '#/theme'
import {useSession} from '#/state/session'
import {usePartsQuery} from '#/modules/shared'
import {DataTable} from 'react-native-paper'

import {Parts} from '#/modules/shared/types'
import {formatDate} from '#/utils/date'

import {PartsMenu} from './PartsMenu'
import {useModalControls} from '#/state/modals'
import {currency} from '#/lib/currency'
import {List} from '../util/List'

type PartsListProps = {}

const LOADING = {_reactKey: '__loading__'}
const EMPTY = {_reactKey: '__empty__'}
const ERROR_ITEM = {_reactKey: '__error__'}
export function PartsList(props: PartsListProps) {
  const t = useTheme()
  const {session} = useSession()

  const {openModal} = useModalControls()
  const {
    data,
    isLoading,
    isFetching,
    isFetched,
    isError,
    refetch,
    isRefetching,
  } = usePartsQuery(session?.store_id)

  const onPressEdit = useCallback(
    (part: Parts) => () => {
      openModal({
        name: 'create-or-edit-part',
        part: part,
      })
    },
    [openModal],
  )

  const isEmpty = !isFetching && !data?.length
  const items = React.useMemo(() => {
    let items: any[] = []
    if (isError && isEmpty) {
      items = items.concat([ERROR_ITEM])
    }
    if (!isFetched && isFetching) {
      items = items.concat([LOADING])
    } else if (isEmpty) {
      items = items.concat([EMPTY])
    } else {
      items = items.concat(data)
    }
    return items
  }, [isError, isEmpty, isFetched, isFetching, data])

  const renderItem = useCallback(({item}: ListRenderItemInfo<Parts>) => {
    return <DataTableRow item={item} onPressEdit={onPressEdit(item)} />
  }, [])
  return (
    // <View style={[a.flex_grow, a.mx_2xl, a.mt_sm]}>
    <DataTable
      style={[
        {
          flex: 1,
          backgroundColor: '#fff',
          borderRadius: 10,
          marginBottom: 2,
        },
      ]}>
      <DataTable.Header>
        <DataTable.Title textStyle={styles.columnTitle}>Parts</DataTable.Title>

        <DataTable.Title textStyle={styles.columnTitle}>
          Part No.
        </DataTable.Title>
        <DataTable.Title textStyle={styles.columnTitle}>
          Category
        </DataTable.Title>
        <DataTable.Title textStyle={styles.columnTitle}>
          Description
        </DataTable.Title>
        <DataTable.Title textStyle={styles.columnTitle}>Brand</DataTable.Title>
        <DataTable.Title textStyle={styles.columnTitle}>Price</DataTable.Title>
        <DataTable.Title textStyle={styles.columnTitle}>
          Created at
        </DataTable.Title>
      </DataTable.Header>
      <List
        data={items}
        initialNumToRender={20}
        renderItem={renderItem}
        ListEmptyComponent={
          isLoading || isRefetching ? (
            <View style={[a.py_2xs]}>
              <ActivityIndicator size={'large'} />
            </View>
          ) : (
            <View
              style={[a.flex_1, a.justify_center, a.align_center, a.py_2xs]}>
              <Text>The list is empty</Text>
            </View>
          )
        }
        refreshing={isRefetching}
        onRefresh={refetch}
      />
      {/* <FlatList
          data={items}
          initialNumToRender={30}
          renderItem={renderItem}
          style={{paddingBottom: 200}}
          ListEmptyComponent={
            isLoading || isRefetching ? (
              <View style={[a.py_2xs]}>
                <ActivityIndicator size={'large'} />
              </View>
            ) : (
              <View
                style={[a.flex_1, a.justify_center, a.align_center, a.py_2xs]}>
                <Text>The list is empty</Text>
              </View>
            )
          }
          refreshing={isRefetching}
          onRefresh={refetch}
        /> */}
    </DataTable>
    // </View>
  )
}

function DataTableRow({
  item,
  onPressEdit,
}: {
  item: Parts
  onPressEdit: (id: number) => void
}) {
  return (
    <DataTable.Row key={item.id}>
      <DataTable.Cell>
        <Text>{item.name}</Text>
      </DataTable.Cell>

      <DataTable.Cell>
        <Text>{item.part_no}</Text>
      </DataTable.Cell>
      <DataTable.Cell>
        <Text style={[a.font_bold]}>{item.category?.name ?? ''}</Text>
      </DataTable.Cell>
      <DataTable.Cell>
        <Text>{item.description}</Text>
      </DataTable.Cell>
      <DataTable.Cell>
        <Text>{item.brand}</Text>
      </DataTable.Cell>
      <DataTable.Cell>
        <Text>{currency.format(item.price ?? 0)}</Text>
      </DataTable.Cell>
      <DataTable.Cell>
        <View style={[a.flex_1, a.justify_between, a.flex_row]}>
          <Text>{formatDate(item.created_at)}</Text>
          <PartsMenu onEdit={() => onPressEdit(item.id)} partId={item.id} />
        </View>
      </DataTable.Cell>
    </DataTable.Row>
  )
}
const styles = StyleSheet.create({
  columnTitle: {fontWeight: '700', color: '#000', fontSize: 16},
})
