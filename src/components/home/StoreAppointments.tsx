import React, {memo} from 'react'
import {View, StyleSheet, ActivityIndicator} from 'react-native'
import {Text} from '#/components/Typography'
import {useTheme, atoms as a} from '#/theme'
import {AppointmentsTable} from './AppoinmentTable'
import {useAppointmentsQuery} from '#/modules/appointment'

import {useRealtimeAppointment} from '#/modules/appointment/hooks/useRealtimeAppointment'

export const StoreAppointments = memo(function StoreAppointments({
  storeId,
}: {
  storeId: string
}) {
  const {
    data: appointments,
    isRefetching,
    isLoading,
  } = useAppointmentsQuery(storeId)

  useRealtimeAppointment()
  return (
    <View style={[a.mx_sm, , a.p_2xs, a.rounded_2xs, a.flex_1]}>
      <Text style={[a.font_bold, a.text_xl, a.mb_2xs]}>Appointments</Text>
      {isRefetching || isLoading ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : (
        <AppointmentsTable appointments={appointments} />
      )}
    </View>
  )
})

const styles = StyleSheet.create({})
