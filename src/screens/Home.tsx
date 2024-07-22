import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Text } from '#/components/Typography'
import { atoms as a, useTheme } from '#/theme'
import { useSession } from '#/state/session'

import { HStack } from '#/components/HStack'
import { CalendarCheck, Wrench } from 'lucide-react-native'
import { colors } from '#/lib/styles'
import { currency } from '#/lib/currency'
import { CashSvg } from '#/components/icons/Cash'
import { useStorePerformance } from '#/modules/appointment'
import { PeriodTypes, periods } from '#/lib/constants'
import { StoreAppointments } from '#/components/home/StoreAppointments'
import HomeHeader from '#/components/home/HomeHeader'

export function HomeScreen() {
  const t = useTheme()
  const { session } = useSession()

  if (!session) {
    return (
      <View style={[a.flex_1, a.gap_2xl]}>
        <Text>Failed to load user data</Text>
      </View>
    )
  }
  return (
    <View style={[a.flex_1, a.gap_2xl]}>
      <HomeHeader
        name={`${session?.user.user_metadata.first_name ?? ''} ${
          session?.user.user_metadata.last_name ?? ''
        }`}
        role={`${session?.user_role}`}
      />
      <ScrollView>
        <HomePageInner storeId={session.store_id} />
      </ScrollView>
    </View>
  )
}

function HomePageInner({ storeId }: { storeId: string | null }) {
  return (
    <View>
      <StoreStatistic storeId={storeId!} />
      <StoreAppointments storeId={storeId!} />
    </View>
  )
}

function StoreStatistic({ storeId }: { storeId: string }) {
  const [period, setPeriod] = useState<PeriodTypes>('this_week')
  const { data: storePerformance } = useStorePerformance(storeId!, period)
  return (
    <View style={[a.px_lg, a.pb_xs]}>
      <View style={[a.px_lg, a.self_end, a.flex_row, a.gap_2xs]}>
        {periods.map(({ label, value }) => {
          const isActive = period === value
          return (
            <TouchableOpacity
              key={value}
              onPress={() => setPeriod(value)}
              style={[
                a.px_2xs,
                a.py_3xs,
                a.border,
                {
                  borderRadius: 5,
                  borderColor: isActive ? '#b61616' : colors.gray4,
                },
              ]}>
              <Text style={[, { color: isActive ? '#b61616' : colors.gray5 }]}>
                {label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
      <Text style={[a.font_bold, a.text_xl, a.mb_sm]}>Store Performance</Text>
      <HStack style={[a.gap_md]}>
        <View style={[a.py_sm, a.px_md, a.justify_between, styles.card]}>
          <HStack style={[a.justify_between, a.align_center]}>
            <Text style={[a.font_bold, a.text_lg]}>Revenue</Text>
          </HStack>
          <HStack style={[a.gap_xs]}>
            <View
              style={[
                { backgroundColor: '#000', height: 28, width: 28 },
                a.rounded_full,
                a.justify_center,
                a.align_center,
              ]}>
              <CashSvg size={22} color="#fff" />
            </View>
            <Text style={[a.text_xl, a.font_bold]}>
              {currency.format(storePerformance?.total_revenue ?? 0)}
            </Text>
          </HStack>
        </View>
        <View style={[a.py_sm, a.px_md, a.justify_between, styles.card]}>
          <Text style={[a.font_bold, a.text_lg]}>Appointment</Text>
          <HStack style={[a.gap_xs]}>
            <View
              style={[
                { backgroundColor: '#41C575', height: 28, width: 28 },
                a.rounded_full,
                a.justify_center,
                a.align_center,
              ]}>
              <CalendarCheck size={20} color={'#fff'} />
            </View>
            <Text style={[a.text_xl, a.font_bold]}>
              {storePerformance?.total_orders ?? 0}
            </Text>
          </HStack>
        </View>
        <View style={[a.py_sm, a.px_md, a.justify_between, styles.card]}>
          <Text style={[a.font_bold, a.text_lg]}>Car serviced </Text>
          <HStack style={[a.gap_xs]}>
            <View
              style={[
                { backgroundColor: 'grey', height: 28, width: 28 },
                a.rounded_full,
                a.justify_center,
                a.align_center,
              ]}>
              <Wrench size={20} color={'#fff'} />
            </View>
            <Text style={[a.text_xl, a.font_bold]}>
              {storePerformance?.cars_serviced ?? 0}
            </Text>
          </HStack>
        </View>
      </HStack>
    </View>
  )
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    width: 250,
    height: 100,
    borderRadius: 20,
  },
  searchBarShadow: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: -0.2,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 4,
  },
  repairTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1188CA',
    flex: 1,
    maxWidth: '70%',
  },
})
