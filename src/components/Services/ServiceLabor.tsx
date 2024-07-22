import { RepairOrder, useRemoveLineServiceMutation } from '#/modules/repairs'
import { useSidebarControls } from '#/state/shell/sidebar'
import { useTheme } from '#/theme'
import { useCallback, useState } from 'react'
import * as Prompt from '#/components/Prompt'
import { useGlobalLoadingControls } from '#/state/shell/global-loading'
import { OrderLineService } from '#/modules/orders'
import { atoms as a } from '#/theme'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { color } from '#/theme/tokens'
import { DataTable } from 'react-native-paper'
import { Text } from '../Typography'
import { HStack } from '../HStack'
import { Edit, PlusCircle, Trash } from 'lucide-react-native'

export function ServiceLabor({
  services,
  id,
}: {
  services: RepairOrder['order_line_services']
  id: string
}) {
  const t = useTheme()
  const { mutateAsync: removeServiceLine } = useRemoveLineServiceMutation()
  const [orderLineId, setOrderLineId] = useState(0)
  const { openSidebar } = useSidebarControls()
  const deletePromptControl = Prompt.usePromptControl()
  const globalLoading = useGlobalLoadingControls()

  const onEditOrderLine = useCallback(
    (service: OrderLineService) => {
      openSidebar({
        orderLineService: { ...service },
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
    openSidebar({
      orderLineService: {
        repair_order_id: id,
        name: '',
        service_id: 0,
        price: 0,
        quantity: 1,
      },
      orderLinePart: undefined,
      showSidebar: true,
    })
  }, [id])

  const onDeleteService = useCallback(async () => {
    globalLoading.show()
    await removeServiceLine({ orderId: id, orderLineId })
    globalLoading.hide()
  }, [id, orderLineId, globalLoading])

  return (
    <View
      style={[
        t.atoms.bg,
        a.rounded_md,
        a.rounded_sm,
        a.border,
        a.mx_5xl,
        a.mt_lg,
        { borderColor: color.gray_200 },
      ]}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title
            textStyle={[
              styles.title,
              a.text_xl,
              a.font_bold,
              { color: '#000' },
            ]}>
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
              <Text>{orderLine.price}</Text>
            </DataTable.Cell>
            <DataTable.Cell centered>
              <Text>{orderLine.quantity * orderLine.price} </Text>
            </DataTable.Cell>
            <DataTable.Cell style={[]}>
              <HStack style={[a.gap_xl]}>
                <TouchableOpacity
                  style={[]}
                  onPress={() => onEditOrderLine(orderLine)}>
                  <Edit size={18} color={'#000'} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onDeleteLineService(orderLine.id!)}>
                  <Trash size={18} color={color.red_500} />
                </TouchableOpacity>
              </HStack>
            </DataTable.Cell>

            {/* <View style={[a.absolute, { right: 0 }]}></View> */}
          </DataTable.Row>
        )
      })}
      <DataTable.Row style={[a.justify_center]}>
        <TouchableOpacity
          onPress={onAddServiceLine}
          style={[a.justify_center, a.flex_row, a.align_center, a.gap_xs]}>
          <PlusCircle size={20} color={color.blue_500} />
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
  title: {
    fontSize: 18,
    letterSpacing: 0.25,
  },
})
