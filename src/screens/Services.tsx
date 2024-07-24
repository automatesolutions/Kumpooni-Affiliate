import React, {useCallback, useState} from 'react'
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
} from 'react-native'
import {DataTable} from 'react-native-paper'
import {useNavigation} from '@react-navigation/native'
import {Text} from '#/components/Typography'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {currency} from '#/lib/currency'
import {useSession} from '#/state/session'
import {CenteredView} from '#/view/com/util/Views'
import {statusFilterTab} from '#/lib/constants'
import {AllNavigatorParams, NavigationProp} from '#/lib/routes/types'
import {useTheme, atoms as a} from '#/theme'
import {color} from '#/theme/tokens'
import {
  useDeleteService,
  useServicesPaginationQuery,
  useUpdateServiceStatus,
} from '#/modules/services'
import {
  SearchParams,
  Services,
  ServiceStatus,
  ServiceStatusType,
  StatusFilter,
} from '#/modules/services/types'

import {ServicesMenu} from '#/view/com/services/ServicesMenu'
import {logger} from '#/logger'
import {Button} from '#/components/Button'
import {ServiceStatus as ServiceStatusBadge} from '#/components/Services/ServicesStatus'
import {ListEmptyItem} from '#/components/ListEmptyItem'
import {List} from '#/view/com/util/List'

type Props = NativeStackScreenProps<AllNavigatorParams, 'Service'>
const ITEM_HEIGHT = 50
const defaultFilter: StatusFilter = {
  column: 'status',
  operator: 'eq',
  value: 'All',
}
export function ServicesScreen(props: Props) {
  const t = useTheme()
  const {session} = useSession()
  if (!session?.store_id) {
    return (
      <CenteredView>
        <Text>Failed to authenticate user</Text>
      </CenteredView>
    )
  }

  return <ServicesScreeenInner storeId={session.store_id} />
}

function ServicesScreeenInner({storeId}: {storeId: string}) {
  return (
    <View style={[a.flex_1]}>
      <ServicesTable storeId={storeId} />
    </View>
  )
}

function ServicesTable({storeId}: {storeId: string}) {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    limit: 150,
    offset: 0,
    filters: [defaultFilter],
  })
  const {
    data: services,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useServicesPaginationQuery(storeId, searchParams)

  const [page, setPage] = useState<number>(0)
  const [numberOfItemsPerPageList] = useState([10, 20, 30, 50, 100])
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0],
  )
  const entries = services ?? []
  const navigation = useNavigation<NavigationProp>()
  const deleteMutation = useDeleteService()
  const toggleActiveInactive = useUpdateServiceStatus()

  const onSelectStatus = useCallback(
    (status: ServiceStatusType) => {
      setSearchParams(prev => {
        return {
          ...prev,
          filters: [{...defaultFilter, value: status}],
        }
      })
    },
    [setSearchParams],
  )
  if (isError) {
    return (
      <View>
        <Text>Failed to fetch data</Text>
      </View>
    )
  }
  const onPressEdit = useCallback(
    (id: number) => {
      navigation.navigate('CreateOrEditService', {id})
    },
    [navigation],
  )
  const onPressDelete = useCallback(
    (id: number) => {
      try {
        deleteMutation.mutateAsync({
          id,
        })
      } catch (error) {
        logger.error('Failed to delete services', {error})
      }
    },
    [deleteMutation],
  )

  const onNewService = useCallback(() => {
    navigation.navigate('CreateOrEditService', {id: undefined})
  }, [navigation])
  const onToggleActiveInactive = useCallback(
    async (id: number, status: ServiceStatus) => {
      try {
        toggleActiveInactive.mutateAsync({
          id,
          status: status === 'Active' ? 'Inactive' : 'Active',
        })
      } catch (error) {
        logger.error('Failed to update service', {error})
      }
    },
    [toggleActiveInactive],
  )

  const renderItem = useCallback(({item}: ListRenderItemInfo<Services>) => {
    return (
      <DataTableRow
        service={item}
        onPressDelete={onPressDelete}
        onPressEdit={onPressEdit}
        onToggleActiveInactive={onToggleActiveInactive}
      />
    )
  }, [])
  return (
    <View style={[a.flex_1, a.p_lg]}>
      <View style={[a.flex_row, a.justify_between, a.align_center, a.mt_xs]}>
        <Text style={[a.text_xl, a.font_bold]}>Manage Services</Text>
        <Button
          onPress={onNewService}
          variant="solid"
          color="primary"
          label={'Add new service'}
          style={[a.p_2xs, a.rounded_sm]}>
          New Service
        </Button>
      </View>

      <StatusFilterTab searchParams={searchParams} onSelect={onSelectStatus} />

      <DataTable
        style={[
          {
            marginBottom: 20,
            flex: 1,
          },
        ]}>
        <DataTable.Header
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}>
          <DataTable.Title textStyle={styles.columnTitle}>
            Service
          </DataTable.Title>
          <DataTable.Title textStyle={styles.columnTitle}>
            Category
          </DataTable.Title>
          <DataTable.Title textStyle={styles.columnTitle}>
            Description
          </DataTable.Title>
          <DataTable.Title textStyle={styles.columnTitle} style={{}}>
            Status
          </DataTable.Title>
          <DataTable.Title textStyle={styles.columnTitle}>
            Grand Total
          </DataTable.Title>
        </DataTable.Header>

        <List
          data={entries}
          initialNumToRender={30}
          renderItem={renderItem}
          contentContainerStyle={styles.tableInner}
          ListEmptyComponent={
            isLoading || isRefetching ? (
              <View style={[a.py_2xs]}>
                <ActivityIndicator size={'large'} />
              </View>
            ) : (
              <ListEmptyItem style={{paddingTop: 100}} />
            )
          }
          ItemSeparatorComponent={() => <TableSeparator />}
          // ListFooterComponent={<TableFooter />}
          refreshing={isRefetching}
          onRefresh={refetch}
        />
      </DataTable>
    </View>
  )
}

function TableSeparator() {
  const t = useTheme()
  return (
    <View
      style={[
        a.border_t,
        t.atoms.border_contrast_medium,
        {height: 1, width: '100%'},
      ]}
    />
  )
}

function DataTableRow({
  service,
  onPressEdit,
  onPressDelete,
  onToggleActiveInactive,
}: {
  service: Services
  onPressEdit: (id: number) => void
  onPressDelete: (id: number) => void
  onToggleActiveInactive: (id: number, status: ServiceStatus) => void
}) {
  const t = useTheme()
  return (
    <DataTable.Row style={[t.atoms.bg]}>
      <DataTable.Cell>
        <Text>{service.name}</Text>
      </DataTable.Cell>
      <DataTable.Cell>
        <Text>{service.categories?.name ?? ''}</Text>
      </DataTable.Cell>
      <DataTable.Cell>
        <Text>{service.description}</Text>
      </DataTable.Cell>
      <DataTable.Cell>
        <ServiceStatusBadge status={service.status} />
      </DataTable.Cell>
      <DataTable.Cell>
        <View style={[a.flex_1, a.justify_between, a.flex_row]}>
          <Text>{currency.format(service.price)}</Text>
          <ServicesMenu
            onEdit={() => onPressEdit(service.id)}
            onDelete={() => onPressDelete(service.id)}
            onToggleActiveInactive={() =>
              onToggleActiveInactive(service.id, service.status)
            }
            status={service.status}
          />
        </View>
      </DataTable.Cell>
    </DataTable.Row>
  )
}

function StatusFilterTab({
  searchParams,
  onSelect,
}: {
  searchParams: SearchParams
  onSelect: (status: ServiceStatusType) => void
}) {
  return (
    <>
      <View
        style={[
          a.flex_row,
          a.gap_2xs,
          a.mb_sm,
          a.border_b,
          {borderColor: color.gray_300},
        ]}>
        {statusFilterTab.map(tab => {
          const isActive = tab.label === searchParams?.filters[0].value

          return (
            <TouchableOpacity
              onPress={() => onSelect(tab.value)}
              key={tab.value}
              style={[a.px_2xs, a.py_2xs, isActive && styles.activeTab]}>
              <Text style={{color: isActive ? '#000' : color.gray_600}}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </>
  )
}
function TableFooter() {
  return <View style={[{marginBottom: 50, height: 40, width: '100%'}]}></View>
}

const styles = StyleSheet.create({
  tabBtn: {
    paddingVertical: 6,
    paddingHorizontal: 8,

    borderRadius: 999,
  },
  textActive: {
    color: '#fff',
  },
  columnTitle: {fontWeight: '700', color: '#000', fontSize: 16},
  activeTab: {
    borderBottomColor: color.blue_400,
    borderBottomWidth: 6,
  },
  tableInner: {
    marginBottom: 100,
    borderRadius: 10,
    borderTopLeftRadius: 0,
  },
})
