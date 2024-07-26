import React, {useCallback, useMemo, useState} from 'react'
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

import {Text} from '#/components/Typography'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {useTheme, atoms as a} from '#/theme'
import {CommonNavigatorParams, NavigationProp} from '#/lib/routes/types'
import {CarFront, Edit, PlusCircle, Trash, User} from 'lucide-react-native'

import {DataTable} from 'react-native-paper'
import {HStack} from '#/components/HStack'
import {useSession} from '#/state/session'
import {
  RepairOrder,
  usePaymentHistoryQuery,
  useRemoveLinePartMutation,
  useRemoveLineServiceMutation,
  useRepairOrderQuery,
} from '#/modules/repairs'
import * as Prompt from '#/components/Prompt'
import {CenteredView} from '#/view/com/util/Views'

import {OrderLinePart, OrderLineService} from '#/modules/orders'
import {Sidebar} from '#/view/com/sidebar/Sidebar'
import {useSidebarControls} from '#/state/shell/sidebar'

import {useGlobalLoadingControls} from '#/state/shell/global-loading'
import {color} from '#/theme/tokens'
import {colors} from '#/lib/styles'

import {OrderOverview} from '#/components/Order/OrderOverview'
import {currency} from '#/lib/currency'
import {ErrorScreen} from '#/view/com/util/error/ErrorScreen'
import {Button, ButtonText} from '#/components/Button'
import {logger} from '#/logger'
import {useNavigation} from '@react-navigation/native'

type Props = NativeStackScreenProps<CommonNavigatorParams, 'OrderDetails'>
export function OrderDetailsScreen({route}: Props) {
  const t = useTheme()
  const {id} = route.params
  const {session} = useSession()

  if (!session) {
    return (
      <CenteredView style={[a.align_center, a.justify_center, a.flex_1]}>
        <ActivityIndicator />
      </CenteredView>
    )
  }

  return (
    <Sidebar>
      <OrderDetailsInner id={id} />
    </Sidebar>
  )
}

function OrderDetailsInner({id}: {id: string}) {
  const t = useTheme()
  const navigation = useNavigation<NavigationProp>()

  const {
    data: repair,
    isLoading: isLoadingRepair,
    isError,
  } = useRepairOrderQuery({
    id: id,
  })
  const {
    data: paymentHistory,
    refetch,
    isLoading: paymentHistoryLoading,
  } = usePaymentHistoryQuery(id)
  const onRetry = useCallback(async () => {
    try {
      await refetch()
    } catch (error) {
      logger.error('Failed to refresh order details', {message: error})
    }
  }, [refetch])

  const onPressBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  if (isLoadingRepair) {
    return (
      <View style={[a.flex_1, a.justify_center, a.align_center]}>
        <ActivityIndicator size={'large'} color={'red'} />
      </View>
    )
  }

  if (isError) {
    return (
      <View style={[a.flex_1, a.justify_center, a.align_center, t.atoms.bg]}>
        <Text style={[a.text_2xl, a.font_bold, a.mb_2xs]}>Error</Text>
        <Text style={[]}>System error. Please try again</Text>
        <View style={[a.flex_row, a.gap_sm]}>
          <Button
            onPress={onPressBack}
            label="Retry"
            variant="outline"
            color="primary_blue"
            size="medium"
            style={[a.mt_2xl]}>
            <ButtonText style={[a.text_xl, t.atoms.text]}>Go Back</ButtonText>
          </Button>
          <Button
            onPress={onRetry}
            label="Retry"
            variant="solid"
            color="primary_blue"
            size="medium"
            style={[a.mt_2xl]}>
            <ButtonText style={[a.text_xl]}>Retry</ButtonText>
          </Button>
        </View>
      </View>
    )
  }
  return (
    <View style={[a.flex_1, a.flex_row, {backgroundColor: '#fff'}]}>
      {repair ? (
        <ScrollView
          style={[
            a.pt_lg,
            a.rounded_xs,
            a.px_sm,
            t.atoms.border_contrast_medium,
            {flex: 1},
          ]}>
          <Text
            style={[
              a.text_lg,
              a.font_bold,
            ]}>{`Order No: #${repair.reference_no}`}</Text>
          <HStack style={[a.gap_2xl, a.mt_xs]}>
            <HStack style={[a.gap_2xs]}>
              <View
                style={[
                  a.p_2xs,
                  {backgroundColor: color.gray_100, borderRadius: 5},
                ]}>
                <User size={24} color={color.gray_500} />
              </View>
              <View>
                <Text>{`${repair?.first_name} ${repair?.last_name} `}</Text>
                <Text>{repair.phone}</Text>
              </View>
            </HStack>
            <HStack style={[a.gap_2xs]}>
              <View
                style={[
                  a.p_2xs,
                  {backgroundColor: color.gray_100, borderRadius: 5},
                ]}>
                <CarFront size={24} color={color.gray_500} />
              </View>
              <View>
                {repair.vehicle_id ? (
                  <Text
                    style={[
                      a.font_bold,
                    ]}>{`${repair.year_model} ${repair.make} ${repair.model}`}</Text>
                ) : null}
              </View>
            </HStack>
          </HStack>
          <OrderLineServices id={id} services={repair.order_line_services} />
          <OrderLineParts id={id} parts={repair.order_line_parts} />
        </ScrollView>
      ) : null}

      <View
        style={[
          {flex: 0.45},
          a.pt_lg,
          a.border_l,
          {borderColor: color.gray_100},
        ]}>
        {paymentHistoryLoading ? (
          <View style={[a.justify_center, a.align_center]}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          repair && <OrderOverview repair={repair} payments={paymentHistory} />
        )}
      </View>
    </View>
  )
}

function OrderLineParts({
  id,
  parts,
}: {
  id: string
  parts: RepairOrder['order_line_parts']
}) {
  const t = useTheme()
  const {mutate: removeLine} = useRemoveLinePartMutation()
  const [orderPartId, setOrderPartId] = useState(0)
  const {openSidebar, closeSidebar} = useSidebarControls()
  const deletePromptControl = Prompt.usePromptControl()
  const {session} = useSession()
  const onEditOrderLine = useCallback(
    (part: OrderLinePart) => {
      openSidebar({
        orderLineService: undefined,
        orderLinePart: {...part},
        showSidebar: true,
      })
    },
    [, openSidebar],
  )
  const onDeleteLineRepair = (orderPartId: number) => {
    setOrderPartId(orderPartId)
    deletePromptControl.open()
  }

  const onAddPartLine = useCallback(() => {
    if (!session?.store_id) return
    openSidebar({
      orderLineService: undefined,
      orderLinePart: {
        repair_order_id: id,
        name: '',
        part_no: '',
        part_id: 0,
        store_id: session.store_id,
        quantity: 1,
        price: 0,
      },
      showSidebar: true,
    })
  }, [id, session])

  const onDeleteRepair = useCallback(() => {
    removeLine({orderId: id, partLineId: orderPartId})
  }, [id, orderPartId])

  return (
    <View
      style={[
        t.atoms.bg,
        a.rounded_md,
        a.rounded_sm,
        a.border,
        {borderColor: color.gray_200},
      ]}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title
            textStyle={[styles.title, a.text_md, a.font_bold, {color: '#000'}]}>
            Parts
          </DataTable.Title>
          <DataTable.Title textStyle={[styles.title]}>Part #</DataTable.Title>
          <DataTable.Title textStyle={[styles.title]}>Quantity</DataTable.Title>
          <DataTable.Title textStyle={[styles.title]}>Rate</DataTable.Title>
          <DataTable.Title textStyle={[styles.title]}>Subtotal</DataTable.Title>
          <DataTable.Title textStyle={[styles.title]}>Action</DataTable.Title>
        </DataTable.Header>
      </DataTable>
      {parts.map(orderLine => {
        return (
          <DataTable.Row key={orderLine.id}>
            <DataTable.Cell>
              <Text>{orderLine.name}</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text>{orderLine.part_no}</Text>
            </DataTable.Cell>
            <DataTable.Cell centered>
              <Text style={[]}>{orderLine.quantity}</Text>
            </DataTable.Cell>
            <DataTable.Cell centered>
              <Text>{currency.format(orderLine.price ?? 0)}</Text>
            </DataTable.Cell>
            <DataTable.Cell centered>
              <Text>
                {currency.format(orderLine.quantity * orderLine.price ?? 0)}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell style={[]}>
              <HStack style={[a.gap_xl]}>
                <TouchableOpacity
                  style={[]}
                  onPress={() => onEditOrderLine(orderLine)}>
                  <Edit size={16} color={'#000'} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onDeleteLineRepair(orderLine.id!)}>
                  <Trash size={16} color={color.red_500} />
                </TouchableOpacity>
              </HStack>
            </DataTable.Cell>

            {/* <View style={[a.absolute, { right: 0 }]}></View> */}
          </DataTable.Row>
        )
      })}
      <DataTable.Row style={[a.justify_center]}>
        <TouchableOpacity
          onPress={onAddPartLine}
          style={[a.justify_center, a.flex_row, a.align_center, a.gap_xs]}>
          <PlusCircle size={16} color={colors.blue5} />
          <Text>Add Part</Text>
        </TouchableOpacity>
      </DataTable.Row>

      <Prompt.Basic
        control={deletePromptControl}
        title={`Delete Part?`}
        description={`Are you sure you'd like to delete this part?`}
        onConfirm={onDeleteRepair}
        confirmButtonCta={`Delete`}
        confirmButtonColor="negative"
      />
    </View>
  )
}

function OrderLineServices({
  services,
  id,
}: {
  services: RepairOrder['order_line_services']
  id: string
}) {
  const t = useTheme()
  const {mutateAsync: removeServiceLine} = useRemoveLineServiceMutation()
  const [orderLineId, setOrderLineId] = useState(0)
  const {session} = useSession()
  const {openSidebar} = useSidebarControls()
  const deletePromptControl = Prompt.usePromptControl()
  const globalLoading = useGlobalLoadingControls()

  const onEditOrderLine = useCallback(
    (service: OrderLineService) => {
      openSidebar({
        orderLineService: {...service},
        orderLinePart: undefined,
        showSidebar: true,
      })
    },
    [openSidebar],
  )

  const onDeleteLineService = (orderLineId: number) => {
    setOrderLineId(orderLineId)
    deletePromptControl.open()
  }

  const onAddServiceLine = useCallback(() => {
    if (!session?.store_id) return
    openSidebar({
      orderLineService: {
        repair_order_id: id,
        name: '',
        service_id: 0,
        store_id: session?.store_id,
        price: 0,
        quantity: 1,
      },
      orderLinePart: undefined,
      showSidebar: true,
    })
  }, [id, session])

  const onDeleteService = useCallback(async () => {
    globalLoading.show()
    await removeServiceLine({orderId: id, orderLineId})
    globalLoading.hide()
  }, [id, orderLineId, globalLoading])

  return (
    <View
      style={[
        t.atoms.bg,
        a.rounded_md,
        a.rounded_sm,
        a.border,
        a.mt_sm,
        a.mb_lg,
        {borderColor: color.gray_200},
      ]}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title
            textStyle={[styles.title, a.text_md, a.font_bold, {color: '#000'}]}>
            Services
          </DataTable.Title>
          <DataTable.Title textStyle={[styles.title]}>Quantity</DataTable.Title>
          <DataTable.Title textStyle={[styles.title]}>Rate</DataTable.Title>
          <DataTable.Title textStyle={[styles.title]}>Subtotal</DataTable.Title>
          <DataTable.Title textStyle={[styles.title]}>Action</DataTable.Title>
        </DataTable.Header>
      </DataTable>
      {services.map(orderLine => {
        return (
          <DataTable.Row key={orderLine.id}>
            <DataTable.Cell>
              <Text>{orderLine.name}</Text>
            </DataTable.Cell>
            <DataTable.Cell centered>
              <Text style={[]}>{orderLine.quantity}</Text>
            </DataTable.Cell>
            <DataTable.Cell centered>
              <Text>{currency.format(orderLine.price ?? 0)}</Text>
            </DataTable.Cell>
            <DataTable.Cell centered>
              <Text>
                {currency.format(orderLine.quantity * orderLine.price ?? 0)}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell style={[]}>
              <HStack style={[a.gap_xl]}>
                <TouchableOpacity
                  style={[]}
                  onPress={() => onEditOrderLine(orderLine)}>
                  <Edit size={16} color={'#000'} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onDeleteLineService(orderLine.id!)}>
                  <Trash size={16} color={color.red_500} />
                </TouchableOpacity>
              </HStack>
            </DataTable.Cell>
          </DataTable.Row>
        )
      })}
      <DataTable.Row style={[a.justify_center]}>
        <TouchableOpacity
          onPress={onAddServiceLine}
          style={[a.justify_center, a.flex_row, a.align_center, a.gap_xs]}>
          <PlusCircle size={16} color={colors.blue5} />
          <Text>Add Service</Text>
        </TouchableOpacity>
      </DataTable.Row>

      <Prompt.Basic
        control={deletePromptControl}
        title={`Delete Service?`}
        description={`Are you sure you'd like to delete this service?`}
        onConfirm={onDeleteService}
        confirmButtonCta={`Delete`}
        confirmButtonColor="negative"
      />
    </View>
  )
}
const styles = StyleSheet.create({
  tableBorder: {
    borderWidth: 1,
    borderColor: 'red',
  },
  header: {
    height: 50,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {textAlign: 'center', fontWeight: '500', color: '#1C1C1C'},
  title: {
    fontSize: 16,
    letterSpacing: 0.25,
  },
})
