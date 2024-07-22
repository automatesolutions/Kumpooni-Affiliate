import React, { useCallback, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { RepairOrder, useRemoveLinePartMutation } from '#/modules/repairs'
import { useSidebarControls } from '#/state/shell/sidebar'
import { OrderLinePart } from '#/modules/orders'
import { useTheme, atoms as a } from '#/theme'
import * as Prompt from '#/components/Prompt'
import { DataTable } from 'react-native-paper'
import { color } from '#/theme/tokens'
import { Edit, PlusCircle, Trash } from 'lucide-react-native'
import { Text } from '#/components/Typography'
import { HStack } from '#/components/HStack'
import { ServiceLinePartSchema } from '#/modules/parts/parts.model'
import { useServiceParts } from '#/state/store/service-parts'
import { useRemoveServiceLineMutation } from '#/modules/services'
export function ServiceLineParts({
  storeId,
  serviceId,
}: {
  storeId: string
  serviceId: number | undefined
}) {
  const t = useTheme()
  const { parts, removePart } = useServiceParts(state => ({
    parts: state.parts,
    removePart: state.removePart,
  }))
  const { mutate: removeServiceLine } = useRemoveServiceLineMutation()
  const [serviceLineId, setServiceLineId] = useState<number | undefined>(
    undefined,
  )

  const { openSidebar, closeSidebar } = useSidebarControls()
  const deletePromptControl = Prompt.usePromptControl()

  const onEditOrderLine = useCallback(
    (part: ServiceLinePartSchema) => {
      openSidebar({
        orderLineService: undefined,
        orderLinePart: undefined,
        serviceLinePart: { ...part },
        showSidebar: true,
      })
    },
    [, openSidebar],
  )
  const onDeleteLineRepair = (serviceLineId: number | undefined) => {
    setServiceLineId(serviceLineId)
    deletePromptControl.open()
  }

  const onAddPartLine = useCallback(() => {
    openSidebar({
      orderLineService: undefined,
      orderLinePart: undefined,
      serviceLinePart: {
        discount: 0,
        price: 0,
        cost: 0,
        part_id: 0,
        name: '',
        part_no: null,
        quantity: 1,
        store_id: storeId,
        type: 'Part',
      },
      showSidebar: true,
    })
  }, [storeId])

  const onDeleteRepair = useCallback(() => {
    if (serviceLineId) {
      if (serviceId) {
        removeServiceLine({ serviceId, serviceLineId })
      }
      removePart(serviceLineId)
    }
  }, [storeId, serviceId, serviceLineId])

  return (
    <View
      style={[
        t.atoms.bg,
        a.rounded_md,
        a.rounded_sm,
        a.border,
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
                  onPress={() => onDeleteLineRepair(orderLine.id)}>
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
          onPress={onAddPartLine}
          style={[a.justify_center, a.flex_row, a.align_center, a.gap_xs]}>
          <PlusCircle size={20} color={color.blue_400} />
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

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    letterSpacing: 0.25,
  },
})
