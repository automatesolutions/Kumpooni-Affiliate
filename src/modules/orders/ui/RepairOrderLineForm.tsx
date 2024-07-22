import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { OrderLineService } from '../types'
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { atoms as a, useTheme } from '#/theme'

import { orderLineValidator } from '../orders.models'
import { z } from 'zod'
import { Text } from '#/components/Typography'
import { color } from '#/theme/tokens'
import { HStack } from '#/components/HStack'
import * as TextField from '#/components/forms/TextField'

import SelectDropdown from 'react-native-select-dropdown'

import DropDownPicker from 'react-native-dropdown-picker'

import { useServicesQuery } from '#/modules/shared'
import { useSession } from '#/state/session'
import { useRepairOrderLineMutation } from '#/modules/repairs'
import { useSidebarControls } from '#/state/shell/sidebar'

type Inputs = z.infer<typeof orderLineValidator>
type RepairOrderLineFormProps = {
  initialValues: Inputs | undefined
}

const RepairOrderLineForm = ({ initialValues }: RepairOrderLineFormProps) => {
  const t = useTheme()
  const { session } = useSession()
  const { closeSidebar } = useSidebarControls()

  const { control, handleSubmit, setValue, watch } = useForm({
    resolver: zodResolver(orderLineValidator),
    defaultValues: initialValues,
  })

  const { data, isLoading } = useServicesQuery(session?.store_id)

  const { mutate: upsertOrderLine, isPending } = useRepairOrderLineMutation()
  const onSubmit: SubmitHandler<Inputs> = input => {
    try {
      upsertOrderLine(
        { ...input },
        {
          onSuccess: () => {
            closeSidebar()
          },
        },
      )
    } catch (error) {}

    console.log('first', input)
  }
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(data ?? [])

  return (
    <>
      <View style={[a.gap_xs, a.px_2xl, a.mt_sm]}>
        <View style={[]}>
          <TextField.LabelText>
            <Text>Service name</Text>
          </TextField.LabelText>
          <DropDownPicker
            loading={isLoading}
            open={open}
            value={watch('service_id') ?? 0}
            items={items ?? []}
            schema={{
              value: 'id',
              label: 'name',
            }}
            setOpen={setOpen}
            // setValue={setServiceId}
            onSelectItem={value => {
              console.log('onSelectItem', value)
              setValue('name', value.name)
              setValue('service_id', value.id)
              setValue('price', value.price)
              // setServiceName(value.name)
            }}
            setItems={setItems}
            searchable={true}
            itemSeparator={true}
            searchPlaceholder="Search service"
            listItemContainerStyle={{
              flex: 1,
            }}
            dropDownContainerStyle={{
              maxHeight: 400,
            }}
            style={[
              t.atoms.bg_contrast_25,
              {
                borderWidth: 0,
              },
            ]}
          />
        </View>

        <Controller
          control={control}
          name="quantity"
          render={({
            field: { value, onChange },
            fieldState: { invalid, error },
          }) => {
            return (
              <View style={[]}>
                <TextField.LabelText>
                  <Text>Quantity</Text>
                </TextField.LabelText>
                <TextField.Root>
                  <TextField.Input
                    onChangeText={onChange}
                    label={`Enter quantity`}
                    defaultValue={`${value}`}
                    keyboardType="numeric"
                    isInvalid={invalid}
                  />
                </TextField.Root>
              </View>
            )
          }}
        />
        <Controller
          control={control}
          name="price"
          render={({
            field: { value, onChange },
            fieldState: { invalid, error },
          }) => {
            return (
              <View style={[]}>
                <TextField.LabelText>
                  <Text>Rate</Text>
                </TextField.LabelText>
                <TextField.Root>
                  <TextField.Input
                    onChangeText={onChange}
                    label={`Enter rate`}
                    defaultValue={`${value}`}
                    keyboardType="numeric"
                    isInvalid={invalid}
                  />
                </TextField.Root>
              </View>
            )
          }}
        />
        <HStack style={[a.mt_auto, a.mb_md, a.self_end, a.gap_md]}>
          <Pressable
            onPress={handleSubmit(onSubmit)}
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: '#000' },
              { opacity: pressed ? 0.7 : 1 },
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Submit your car information`}
            accessibilityHint="">
            {isPending && <ActivityIndicator size={'small'} color={'#fff'} />}
            <Text style={styles.textBtn}> Save </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              closeSidebar()
            }}
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: color.gray_600 },
              { opacity: pressed ? 0.7 : 1 },
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Cancel your edit`}
            accessibilityHint="">
            <Text style={styles.textBtn}> Cancel </Text>
          </Pressable>
        </HStack>
      </View>
      {/* )} */}
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 5,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  textBtn: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  container: {
    flex: 1,
    paddingVertical: 100,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop: 90,
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 90,
    backgroundColor: '#E9ECEF',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 16,
  },
  headerTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#151E26',
  },
  dropdownButtonStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdown1SearchInputStyle: {
    backgroundColor: '#444444',
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
  },
})
export default RepairOrderLineForm
