import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {useTheme, atoms as a} from '#/theme'
import {DataTable} from 'react-native-paper'
import {NavigationProp} from '#/lib/routes/types'
import {Appointment} from '#/modules/appointment'
import {PaymentStatus} from '#/modules/orders'
import {convertTo12HourFormat, formatDate, getStatusColor} from '#/lib/utils'
import {Text} from '#/components/Typography'

export function AppointmentsTable({
  appointments,
}: {
  appointments: Appointment[] | undefined
}) {
  const t = useTheme()
  const navigation = useNavigation<NavigationProp>()

  const onPressReference = async (id: string) => {
    // try {
    //   await prefetchServicesAndParts()
    // } catch (error) {
    //   logger.error('onPressReference', { error })
    // }
    navigation.navigate('OrderDetails', {id: id})
  }
  if (!appointments)
    return (
      <View style={[t.atoms.bg]}>
        <Text>Failed to fetch data.</Text>
      </View>
    )
  return (
    <DataTable
      style={[
        {
          backgroundColor: '#fff',
          width: '100%',
          borderRadius: 10,
          marginBottom: 60,
        },
      ]}>
      <DataTable.Header>
        <DataTable.Title textStyle={styles.columnTitle}>
          Order no.
        </DataTable.Title>
        <DataTable.Title textStyle={styles.columnTitle}>Name</DataTable.Title>
        <DataTable.Title textStyle={styles.columnTitle}>Phone</DataTable.Title>
        <DataTable.Title textStyle={styles.columnTitle}>Date</DataTable.Title>
        <DataTable.Title textStyle={styles.columnTitle}>Time</DataTable.Title>
        <DataTable.Title textStyle={styles.columnTitle}>
          Payment
        </DataTable.Title>
        <DataTable.Title textStyle={styles.columnTitle}>Status</DataTable.Title>
      </DataTable.Header>

      <>
        {appointments?.map(item => {
          const itemColor = getStatusColor(item.status)
          return (
            <DataTable.Row key={item.id}>
              <DataTable.Cell>
                <TouchableOpacity
                  onPress={async () => {
                    await onPressReference(item.id!)
                  }}>
                  <Text
                    style={[
                      {
                        color: '#4b71fc',
                        fontSize: 14,
                        borderColor: '#4b71fc',
                      },
                      a.border_b,
                    ]}>
                    {item.reference_no}
                  </Text>
                </TouchableOpacity>
              </DataTable.Cell>
              <DataTable.Cell>{`${item.first_name} ${item.last_name}`}</DataTable.Cell>
              <DataTable.Cell>{item.phone}</DataTable.Cell>
              <DataTable.Cell>{`${formatDate(
                item.appointment_date!,
              )}`}</DataTable.Cell>
              <DataTable.Cell>{`${convertTo12HourFormat(
                item.appointment_time!,
              )}`}</DataTable.Cell>
              <DataTable.Cell>
                <PaymentStatus status={item.invoice_status!} />
              </DataTable.Cell>
              <DataTable.Cell>
                <View style={[{backgroundColor: itemColor, borderRadius: 8}]}>
                  <Text
                    style={[{padding: 6, color: '#fff', fontWeight: '500'}]}>
                    {item.status}
                  </Text>
                </View>
              </DataTable.Cell>
            </DataTable.Row>
          )
        })}
      </>
    </DataTable>
  )
}

const styles = StyleSheet.create({
  tabBtn: {
    paddingVertical: 6,
    paddingHorizontal: 8,

    borderRadius: 999,
  },
  tabBtnActive: {
    backgroundColor: '#293BE1',
  },
  textActive: {
    color: '#fff',
  },
  columnTitle: {fontWeight: '700', color: '#000', fontSize: 16},
})
