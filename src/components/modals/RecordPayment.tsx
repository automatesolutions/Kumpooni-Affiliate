import {colors} from '#/lib/styles'
import React, {useState} from 'react'

import Modal from 'react-native-modal'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native'
import {atoms as a} from '#/theme'
import {Text} from '../Typography'

import {File, X} from 'lucide-react-native'
import {HStack} from '../HStack'
import {color} from '#/theme/tokens'

import * as TextField from '#/components/forms/TextField'
import * as DateField from '#/components/forms/DateField'
import * as TimeField from '#/components/forms/TimeField'
import {PaymentMethodSelection} from '../PaymentMethod'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {paymentValidator} from '#/modules/payment'
import {z} from 'zod'
import {OrderStatusType} from '#/lib/constants'
import {useInsertPayment} from '#/modules/payment/payment.service'
import {currency} from '#/lib/currency'
import {Required} from '../Required'
import {useSession} from '#/state/session'
type Inputs = z.infer<typeof paymentValidator>
type Order = {
  id: string
  reference_no: number
  name: string
  status: OrderStatusType
  totalAmount: number
}

type RecordPaymentProps = {
  isOpen: boolean
  onClosed: () => void
  onConfirm: () => void
  order: Order
  remaining: number
  totalPaid: number
}
export function RecordPaymentModal({
  isOpen,
  onClosed,
  onConfirm,
  order,
  remaining,
  totalPaid,
}: RecordPaymentProps) {
  const {height, width} = useWindowDimensions()

  return (
    <Modal
      isVisible={isOpen}
      backdropOpacity={0.3}
      style={{
        position: 'absolute',
        width: 0.8 * width,
        height: 0.9 * height,
        alignSelf: 'center',
        marginTop: 20,
      }}>
      <View style={[styles.container, a.rounded_sm]}>
        {/* Header */}
        <HStack
          style={[
            {height: 50},
            a.border_b,
            a.justify_between,
            a.align_center,
            a.px_lg,
          ]}>
          <Text style={[a.text_lg, a.font_bold]}>Add Payment</Text>
          <TouchableOpacity onPress={onClosed}>
            <X size={20} color={color.gray_950} />
          </TouchableOpacity>
        </HStack>
        <RecordPaymentInner
          order={order}
          onClosed={onClosed}
          remaining={remaining}
        />
      </View>
    </Modal>
  )
}

function RecordPaymentInner({
  order,
  onClosed,
  remaining,
}: {
  order: Order
  onClosed: () => void
  remaining: number
}) {
  const {session} = useSession()
  const {control, handleSubmit, setValue, watch} = useForm<Inputs>({
    resolver: zodResolver(paymentValidator),
    defaultValues: {
      payment_date: new Date().toISOString(),
      amount: 0,
      reference_no: '',
      description: '',
      payment_method: 'Cash',
    },
  })

  const insertPayment = useInsertPayment()
  const onSaveRecordPayment: SubmitHandler<Inputs> = async input => {
    try {
      await insertPayment.mutateAsync({
        ...input,
        repair_order_id: order.id,
        store_id: session?.store_id!,
      })
      onClosed()
    } catch (error) {
      console.log('Error', error)
    }

    console.log('first', input)
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{flex: 1, flexDirection: 'row'}}>
      <ScrollView style={[a.flex_1, a.px_md]}>
        <Text style={[a.mt_xs, a.text_md, a.font_semibold]}>Order</Text>
        <View
          style={[
            a.mt_xs,
            a.pl_sm,
            a.pr_xs,
            a.rounded_xs,
            a.border,
            a.align_center,
            a.flex_row,
            a.gap_2xs,
            {
              paddingVertical: 4,
              height: 50,
              borderColor: color.gray_600,
            },
          ]}>
          <File size={20} color={color.gray_300} />
          <View>
            <Text
              style={[
                a.font_bold,
              ]}>{`${order.reference_no} - ${order.name}`}</Text>
          </View>
          <Text style={[a.absolute, {right: 10}]}>{`${order.status}`}</Text>
        </View>
        <Controller
          control={control}
          name="payment_method"
          render={({field: {value, onChange}}) => (
            <PaymentMethodSelection onSelect={onChange} option={value} />
          )}
        />
        <View style={[a.flex_1, a.flex_row, a.gap_2xs]}>
          <Controller
            control={control}
            name="amount"
            render={({
              field: {value, onChange},
              fieldState: {invalid, error},
            }) => (
              <View style={[a.flex_1]}>
                <TextField.LabelText style={[]}>
                  {`Amount `} <Required />
                </TextField.LabelText>
                <TextField.Root>
                  <TextField.Input
                    isInvalid={invalid}
                    testID="amount"
                    value={`${value}`}
                    onChangeText={onChange}
                    label={`Payment Date`}
                    accessibilityHint={`Select payment date`}
                    keyboardType="numeric"
                  />
                </TextField.Root>
              </View>
            )}
          />
          <Controller
            control={control}
            name="payment_date"
            render={({
              field: {value, onChange},
              fieldState: {invalid, error},
            }) => (
              <View style={[a.flex_1]}>
                <TextField.LabelText style={[a.font_bold]}>
                  {`Date `} <Required />
                </TextField.LabelText>
                <View>
                  <DateField.DateField
                    isInvalid={invalid}
                    testID="date"
                    value={value}
                    onChangeDate={date => {
                      onChange(date)
                    }}
                    label={`Payment Date`}
                    accessibilityHint={`Select payment date`}
                  />
                </View>
              </View>
            )}
          />
        </View>
        <Controller
          control={control}
          name="reference_no"
          render={({field: {value, onChange}, fieldState: {invalid}}) => (
            <View style={[a.flex_1, a.mt_2xs]}>
              <TextField.LabelText style={[]}>
                Reference no.
              </TextField.LabelText>
              <TextField.Root>
                <TextField.Input
                  isInvalid={invalid}
                  value={value}
                  label="Enter reference"
                  onChangeText={onChange}
                />
              </TextField.Root>
            </View>
          )}
        />
        <View style={[a.flex_1, a.mt_2xs]}>
          <TextField.LabelText style={[]}>Notes</TextField.LabelText>
          <TextField.Root>
            <TextField.Input label="" multiline />
          </TextField.Root>
        </View>
        <TouchableOpacity
          onPress={handleSubmit(onSaveRecordPayment)}
          style={[
            a.self_end,
            a.justify_center,
            a.align_center,
            a.rounded_sm,
            a.mt_xs,
            a.flex_row,
            a.gap_sm,
            {height: 40, width: 100, backgroundColor: '#000'},
          ]}>
          {insertPayment.isPending && <ActivityIndicator size={'small'} />}
          <Text style={[{color: '#fff'}]}>Save</Text>
        </TouchableOpacity>
        <View style={{height: 50}} />
      </ScrollView>
      <View
        style={[
          a.border_l,
          a.py_2xl,
          a.px_sm,
          a.gap_lg,
          {
            flex: 0.5,
            borderColor: color.gray_200,
          },
        ]}>
        <HStack style={[a.justify_between]}>
          <Text style={[a.text_md, a.font_semibold]}>Total order value</Text>
          <Text>{currency.format(order.totalAmount)}</Text>
        </HStack>
        <HStack style={[a.justify_between]}>
          <Text style={[a.text_md]}>Payment amount</Text>
          <Text>{currency.format(watch('amount'))}</Text>
        </HStack>
        <HStack style={[a.justify_between]}>
          <Text style={[a.text_md, a.font_semibold]}>Remaining</Text>
          <Text>{currency.format(remaining)}</Text>
        </HStack>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  paymentTypeBtn: {
    height: 100,
    backgroundColor: color.gray_300,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
