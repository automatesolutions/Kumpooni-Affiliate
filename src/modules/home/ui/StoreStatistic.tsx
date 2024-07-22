import { StyleSheet } from 'react-native'
import { Text } from '#/components/Typography'
import { HStack } from '#/components/HStack'
import { CashSvg } from '#/components/icons/Cash'
import { currency } from '#/lib/currency'
import { StorePerformance } from '#/modules/appointment'
import { CalendarCheck, View, Wrench } from 'lucide-react-native'
import { atoms as a } from '#/theme'

export function StoreStatistic({
  storePerformance,
}: {
  storePerformance: StorePerformance
}) {
  return (
    <View style={[a.px_lg, a.pb_xs]}>
      <Text style={[a.font_bold, a.text_xl, a.mb_sm]}>Store Performance</Text>
      <HStack style={[a.gap_md]}>
        <View style={[a.py_sm, a.px_md, a.justify_between, styles.card]}>
          <HStack style={[a.justify_between, a.align_center]}>
            <Text style={[a.font_bold, a.text_xl]}>Revenue</Text>
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
            <Text style={[a.text_2xl, a.font_bold]}>
              {currency.format(storePerformance?.total_revenue ?? 0)}
            </Text>
          </HStack>
        </View>
        <View style={[a.py_sm, a.px_md, a.justify_between, styles.card]}>
          <Text style={[a.font_bold, a.text_xl]}>Appointment</Text>
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
            <Text style={[a.text_2xl, a.font_bold]}>
              {storePerformance?.total_orders}
            </Text>
          </HStack>
        </View>
        <View style={[a.py_sm, a.px_md, a.justify_between, styles.card]}>
          <Text style={[a.font_bold, a.text_xl]}>Car serviced </Text>
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
            <Text style={[a.text_2xl, a.font_bold]}>
              {storePerformance?.cars_serviced}
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
    padding: 12,
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
