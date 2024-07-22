import React, { useCallback, useMemo, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from '#/components/Typography'
import { useTheme, atoms as a } from '#/theme'
import DropDownPicker from 'react-native-dropdown-picker'
import { HStack } from '../HStack'
import { color } from '#/theme/tokens'
import { OrderStatusType, orderStatus } from '#/lib/constants'
import {
  Payment,
  RepairOrder,
  useAppointmentMutation,
  useUpdateOrderStatus,
} from '#/modules/repairs'
import { currency } from '#/lib/currency'
import { Separator } from '#/view/com/util/Views'
import dayjs from 'dayjs'
import { Plus } from 'lucide-react-native'
import DatePicker from 'react-native-date-picker'
import { useGlobalLoadingControls } from '#/state/shell/global-loading'

import { RecordPaymentModal } from '../modals/RecordPayment'
type OrderOverviewProps = {
  repair: RepairOrder
  payments: Payment[] | undefined
}
export function OrderOverview({ repair, payments }: OrderOverviewProps) {
  const t = useTheme()

  const [open, setOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [dateOpen, setDateOpen] = useState(false)
  const [status, setStatus] = useState<OrderStatusType>(
    repair.status ? repair.status : 'Scheduled',
  )
  const totalPaid = useMemo(() => {
    return (payments ?? []).reduce((acc, payment) => {
      return (acc = acc + payment.amount)
    }, 0)
  }, [payments])

  const order = useMemo(() => {
    return {
      id: repair.id ?? '',
      name: repair.first_name + ' ' + repair.last_name,
      reference_no: repair.reference_no ?? 0,
      status: repair.status ?? 'Scheduled',
      totalAmount: repair.total_cost ?? 0,
    }
  }, [repair])
  const globalLoading = useGlobalLoadingControls()
  const { mutate: updateDateTime } = useAppointmentMutation()
  const { mutateAsync: updateStatusOrder } = useUpdateOrderStatus()
  const [date, setDate] = useState<Date>(
    dayjs(repair.appointment_date_str).toDate() ?? new Date(),
  )

  const remaining = (repair.total_cost ?? 0) - totalPaid
  const [items, setItems] = useState(orderStatus)

  const openDatePicker = useCallback(() => {
    setDateOpen(true)
  }, [setDateOpen])
  const onConfirmDate = useCallback(
    (dateInner: Date) => {
      console.log('dateInner', dateInner)
      const [date, time] = dateInner.toDateString().split('T')

      updateDateTime({
        id: repair.id!,
        date: date,
        time: time,
        dateTime: dateInner,
      })
      setDateOpen(false)
      setDate(dateInner)
    },

    [repair.id, setDate, setDateOpen, updateDateTime],
  )
  const onSelectItem = useCallback(
    async (data: { value: OrderStatusType; label: string }) => {
      globalLoading.show()
      try {
        await updateStatusOrder({
          id: repair.id!,
          status: data.value,
        })
      } catch (error) {
        console.log('onSelectError', error)
      }
      globalLoading.hide
    },
    [repair.id],
  )
  return (
    <>
      <View style={[a.px_xs]}>
        <Text
          style={[
            a.text_lg,
            a.font_bold,
            a.mb_xs,
          ]}>{`#${repair.reference_no}`}</Text>
        <View style={[a.gap_xs]}>
          <Text style={[a.font_bold, a.text_md]}>ORDER STATUS</Text>
          <DropDownPicker
            style={{
              borderColor: color.gray_200,
              borderRadius: 7,
            }}
            textStyle={{
              fontSize: 14,
            }}
            containerStyle={{}}
            dropDownContainerStyle={{
              marginTop: 5,
              borderRadius: 7,
              borderColor: color.gray_200,
            }}
            itemSeparatorStyle={{
              borderColor: color.gray_100,
              borderWidth: 0.2,
            }}
            selectedItemLabelStyle={{
              color: '#000',
              fontWeight: 'bold',
            }}
            selectedItemContainerStyle={{
              backgroundColor: color.gray_100,
            }}
            open={open}
            setOpen={setOpen}
            value={status}
            setValue={setStatus}
            items={items}
            setItems={setItems}
            //@ts-ignore
            onSelectItem={onSelectItem}
          />
        </View>

        <View style={[a.w_full, a.gap_2xs, a.mt_xs]}>
          <HStack style={[a.justify_between]}>
            <Text style={[a.text_sm]}>Created</Text>
            <Text style={[a.text_sm]}>{`${dayjs(repair.created_at).format(
              'MM/DD/YYYY',
            )}`}</Text>
          </HStack>

          <HStack style={[a.justify_between]}>
            <Text style={[a.text_sm]}>Appointment</Text>

            <TouchableOpacity style={[]} onPress={openDatePicker}>
              <Text style={[{ color: color.blue_700 }, a.text_sm]}>{`${dayjs(
                date,
              ).format('MM/DD/YYYY')} at ${dayjs(date).format(
                'h:mm A',
              )}`}</Text>

              <Text style={[{ color: color.blue_700 }, a.self_end, a.text_sm]}>
                Schedule
              </Text>
            </TouchableOpacity>
          </HStack>
          <TouchableOpacity
            onPress={() => setIsOpen(true)}
            style={[
              a.flex_row,
              a.justify_center,
              a.align_center,
              a.gap_2xs,
              { backgroundColor: '#000', height: 40 },
            ]}>
            <Plus size={18} color={'#fff'} />
            <Text style={[t.atoms.text_inverted]}>Payment</Text>
          </TouchableOpacity>
          <HStack style={[a.justify_between]}>
            <Text>Total labor</Text>
            <Text>{currency.format(repair.services_total ?? 0)}</Text>
          </HStack>
          <HStack style={[a.justify_between]}>
            <Text>Total parts</Text>
            <Text>{currency.format(repair.parts_total ?? 0)}</Text>
          </HStack>
          <HStack style={[a.justify_between]}>
            <Text style={[a.font_bold]}>Subtotal</Text>
            <Text
              style={[
                a.border_b,
                { paddingBottom: 3, borderColor: color.trueBlack },
              ]}>
              {currency.format(repair.total_cost ?? 0)}
            </Text>
          </HStack>
          <HStack style={[a.justify_between]}>
            <Text>Taxable: </Text>
            <Text>{currency.format(0)}</Text>
          </HStack>
          <HStack style={[a.justify_between]}>
            <Text>Non Taxable: </Text>
            <Text>{currency.format(0)}</Text>
          </HStack>
          <HStack style={[a.justify_between]}>
            <Text style={[a.font_bold]}>Remaining balance</Text>
            <Text
              style={[
                {
                  paddingBottom: 3,
                  borderColor: color.trueBlack,
                  fontWeight: 'bold',
                },
              ]}>
              {`${currency.format(remaining)}`}
            </Text>
          </HStack>
          <Separator />

          <HStack style={[a.justify_between]}>
            <Text style={[{ color: color.gray_700 }, a.font_bold]}>
              Order no.
            </Text>
            <Text style={[a.font_bold]}>{`#${repair.reference_no}`}</Text>
          </HStack>

          <HStack style={[a.justify_between]}>
            <Text style={[{ color: color.gray_700 }, a.font_bold]}>
              Payment Status
            </Text>
            <Text style={[a.font_bold]}>{`${repair.invoice_status}`}</Text>
          </HStack>

          <Separator />
          <View style={[a.justify_between]}>
            <Text style={[a.font_bold]}>Payment history</Text>
            <PaymentHistory payments={payments} />
          </View>
        </View>
      </View>
      <DatePicker
        modal
        open={dateOpen}
        date={date}
        mode="datetime"
        onConfirm={onConfirmDate}
        onCancel={() => {
          setDateOpen(false)
        }}
      />

      <RecordPaymentModal
        isOpen={isOpen}
        onClosed={() => setIsOpen(false)}
        onConfirm={() => console.log('onConfirm')}
        order={order}
        remaining={remaining}
        totalPaid={totalPaid}
      />
    </>
  )
}

function PaymentHistory({ payments }: { payments: Payment[] | undefined }) {
  if (!payments || payments.length < 0) {
    return null
  }
  return (
    <View>
      {payments.map(payment => (
        <HStack key={payment.id} style={[a.justify_between]}>
          <Text>{`${payment.payment_method} - ${dayjs(
            payment.created_at,
          ).format('MMM D, YYYY')}`}</Text>
          <Text>{currency.format(payment.amount)}</Text>
        </HStack>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({})
