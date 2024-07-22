import React, {useCallback, useState} from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import {Text} from '#/components/Typography'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {useTheme, atoms as a} from '#/theme'
import {AllNavigatorParams, NavigationProp} from '#/lib/routes/types'
import {DataTable} from 'react-native-paper'
import {useSession} from '#/state/session'
import {useRepairOrdersQuery} from '#/modules/repairs'
import {useNavigation} from '@react-navigation/native'
import {convertTo12HourFormat, formatDate, getStatusColor} from '#/lib/utils'

import {PaymentStatus} from '#/modules/orders'
import {color} from '#/theme/tokens'
import {OrderStatusTabType, orderStatusTabs} from '#/lib/constants'
import {currency} from '#/lib/currency'

type Props = NativeStackScreenProps<AllNavigatorParams, 'Order'>
export function OrdersScreen(props: Props) {
  const t = useTheme()
  const {session} = useSession()

  const [page, setPage] = useState<number>(0)

  const [numberOfItemsPerPageList] = useState([10, 20, 30, 50, 100])
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0],
  )
  const [args, setArgs] = useState<{status: OrderStatusTabType}>({
    status: 'All Orders',
  })
  const {data, isLoading, isError} = useRepairOrdersQuery(
    session?.store_id!,
    args,
  )
  const [sortAscending, setSortAscending] = useState(true)

  const navigation = useNavigation<NavigationProp>()

  const onPressReferenceNo = useCallback((id: string) => {
    return () => {
      navigation.navigate('OrderDetails', {id})
    }
  }, [])

  const sortedItems = (data ?? [])
    .slice()
    .sort((item1, item2) =>
      sortAscending
        ? item1.invoice_status!.localeCompare(item2.invoice_status!)
        : item2.invoice_status!.localeCompare(item1.invoice_status!),
    )

  const from = page * itemsPerPage
  const to = Math.min((page + 1) * itemsPerPage, data?.length ?? 0)
  const onSelect = useCallback(
    (status: OrderStatusTabType) => {
      setArgs(prev => {
        return {
          ...prev,
          status: status,
        }
      })
    },
    [setArgs],
  )

  React.useEffect(() => {
    setPage(0)
  }, [itemsPerPage])
  return (
    <View style={[a.flex_1, a.p_lg]}>
      <View style={[a.mt_xs]}>
        <Text style={[a.text_xl, a.font_bold]}>Manage Orders</Text>
      </View>
      <StatusFilterTab onSelect={onSelect} args={args} />
      {/* <View
        style={[
          a.flex_row,
          a.gap_2xs,
          a.mb_sm,
          a.border_b,
          {borderColor: color.gray_300},
        ]}>
        {orderStatusTabs.map(tab => {
          const isActive = tab.label === args.status

          return (
            <TouchableOpacity
              onPress={() => setArgs(prev => ({...prev, status: tab.key}))}
              key={tab.key}
              style={[a.px_2xs, a.py_2xs, isActive && styles.activeTab]}>
              <Text style={{color: isActive ? '#000' : color.gray_600}}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View> */}

      {/* <View style={[a.mx_sm, t.atoms.bg, a.rounded_sm]}> */}
      <DataTable
        style={[
          {
            backgroundColor: '#fff',
            borderRadius: 10,
            width: '100%',
          },
        ]}>
        <DataTable.Header>
          <DataTable.Title textStyle={[styles.columnTitle]}>
            Order
          </DataTable.Title>
          <DataTable.Title textStyle={styles.columnTitle}>
            Vehicle
          </DataTable.Title>
          <DataTable.Title textStyle={styles.columnTitle}>Item</DataTable.Title>
          <DataTable.Title textStyle={styles.columnTitle}>
            Total
          </DataTable.Title>
          <DataTable.Title textStyle={styles.columnTitle}>
            Date/Time
          </DataTable.Title>
          <DataTable.Title textStyle={styles.columnTitle}>
            Status
          </DataTable.Title>
          <DataTable.Title
            textStyle={styles.columnTitle}
            sortDirection={sortAscending ? 'ascending' : 'descending'}
            onPress={() => setSortAscending(!sortAscending)}>
            Payment status
          </DataTable.Title>
        </DataTable.Header>
        {isLoading && (
          <View style={[a.py_2xs]}>
            <ActivityIndicator size={'large'} />
          </View>
        )}
        {sortedItems.slice(from, to).map(item => {
          const statusColor = getStatusColor(item.status)
          // const itemName = (item.service?.length ?? 0) > 1 ? 'items' : 'item'
          return (
            <DataTable.Row key={item.id}>
              <DataTable.Cell style={{}}>
                <Text
                  onPress={onPressReferenceNo(item.id!)}
                  style={[{color: color.blue_600}]}>
                  {`${item.reference_no} - `}
                  <Text style={{color: '#000'}}>
                    {`${item.first_name} ${item.last_name}`}
                  </Text>
                </Text>
              </DataTable.Cell>

              <DataTable.Cell>{`${item.year_model ?? ''} ${item.make ?? ''} ${
                item.model ?? ''
              }`}</DataTable.Cell>
              <DataTable.Cell>
                <View>
                  {item.order_line_services?.map(order_line_services => (
                    <Text style={[a.text_sm]} key={order_line_services.id}>
                      {order_line_services.name}
                    </Text>
                  ))}
                </View>
              </DataTable.Cell>
              <DataTable.Cell>{`${currency.format(
                item.total_cost ?? 0,
              )}`}</DataTable.Cell>
              <DataTable.Cell>{`${formatDate(
                item.appointment_date!,
              )} ${convertTo12HourFormat(
                item.appointment_time!,
              )}`}</DataTable.Cell>

              <DataTable.Cell>
                <View style={[{backgroundColor: statusColor, borderRadius: 8}]}>
                  <Text
                    style={[{padding: 6, color: '#fff', fontWeight: '500'}]}>
                    {item.status}
                  </Text>
                </View>
              </DataTable.Cell>
              <DataTable.Cell>
                <PaymentStatus status={item.invoice_status!} />
              </DataTable.Cell>
            </DataTable.Row>
          )
        })}
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(sortedItems.length / itemsPerPage)}
          onPageChange={page => setPage(page)}
          label={`${from + 1}-${to} of ${sortedItems.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}
        />
      </DataTable>
    </View>
    // </View>
  )
}

function StatusFilterTab({
  args,
  onSelect,
}: {
  args: {status: OrderStatusTabType}
  onSelect: (status: OrderStatusTabType) => void
}) {
  return (
    <View
      style={[
        a.flex_row,
        a.gap_2xs,
        a.mb_sm,
        a.border_b,
        {borderColor: color.gray_300},
      ]}>
      {orderStatusTabs.map(tab => {
        const isActive = tab.label === args.status

        return (
          <TouchableOpacity
            onPress={() => onSelect(tab.key)}
            key={tab.key}
            style={[a.px_2xs, a.py_2xs, isActive && styles.activeTab]}>
            <Text style={{color: isActive ? '#000' : color.gray_600}}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  columnTitle: {fontWeight: '700', color: '#000', fontSize: 16},
  activeTab: {
    borderBottomColor: color.blue_400,
    borderBottomWidth: 5,
  },
})

// {
//   data && data.length > 0 ? (
//     <DataTable.Row>
//       <DataTable.Cell style={[]}>
//         <Menu
//           style={[
//             a.flex_1,
//             a.absolute,
//             a.flex_row,
//             a.justify_center,
//             a.align_center,
//             { right: 0, gap: 5 },
//           ]}>
//           <MenuTrigger style={[a.flex_1]}>
//             <HStack>
//               <Text>View 20</Text>
//               <ChevronDown size={18} color={color.gray_600} />
//             </HStack>
//           </MenuTrigger>
//           <MenuOptions
//             customStyles={{
//               optionsContainer: {
//                 marginTop: 20,
//               },
//             }}>
//             <MenuOption>
//               <Text>Hello world</Text>
//             </MenuOption>
//           </MenuOptions>
//         </Menu>
//       </DataTable.Cell>
//     </DataTable.Row>
//   ) : !isLoading ? (
//     <View style={[a.justify_center, a.align_center, a.py_2xs]}>
//       <Text style={[{ color: color.gray_300 }]}>No Data</Text>
//     </View>
//   ) : null
// }
