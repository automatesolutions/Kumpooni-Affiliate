import { useState } from 'react'

import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { atoms as a, useTheme } from '#/theme'

import { orderLineValidator, partLineValidator } from '../orders.models'
import { z } from 'zod'
import { Text } from '#/components/Typography'
import { color } from '#/theme/tokens'
import { HStack } from '#/components/HStack'
import * as TextField from '#/components/forms/TextField'

import DropDownPicker from 'react-native-dropdown-picker'

import { usePartsQuery, useServicesQuery } from '#/modules/shared'
import { useSession } from '#/state/session'
import {
  useRepairOrderLineMutation,
  useRepairOrderLinePartMutation,
} from '#/modules/repairs'
import { useSidebarControls } from '#/state/shell/sidebar'

type Inputs = z.infer<typeof partLineValidator>
type RepairOrderLineFormProps = {
  initialValues: Inputs | undefined
}

const RepairOrderLinePartForm = ({
  initialValues,
}: RepairOrderLineFormProps) => {
  const t = useTheme()
  const { session } = useSession()
  const { closeSidebar } = useSidebarControls()

  const { control, handleSubmit, setValue, watch } = useForm({
    resolver: zodResolver(partLineValidator),
    defaultValues: initialValues,
  })

  const { data, isLoading } = usePartsQuery(session?.store_id)

  const { mutate: upsertOrderPart, isPending } =
    useRepairOrderLinePartMutation()

  const onSubmit: SubmitHandler<Inputs> = input => {
    console.log('Input', input)
    try {
      upsertOrderPart(
        { ...input },
        {
          onSuccess: () => {
            closeSidebar()
          },
        },
      )
    } catch (error) {}
  }
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(data ?? [])

  return (
    <>
      <View style={[a.gap_xs, a.px_2xl, a.mt_sm]}>
        <View style={[]}>
          <TextField.LabelText>
            <Text>Part name</Text>
          </TextField.LabelText>
          <DropDownPicker
            allow
            loading={isLoading}
            open={open}
            nestedScrollEnabled={true}
            value={watch('part_id') ?? 0}
            items={items ?? []}
            schema={{
              value: 'id',
              label: 'name',
            }}
            setOpen={setOpen}
            // setValue={setServiceId}
            onSelectItem={value => {
              setValue('name', value.name)
              setValue('part_id', value.id)
              setValue('price', value.price)
              setValue('part_no', value.part_no ?? '')
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
      </View>
      <ScrollView
        style={[a.mt_sm]}
        contentContainerStyle={[a.gap_xs, a.px_2xl]}>
        <Controller
          control={control}
          name="part_no"
          render={({
            field: { value, onChange },
            fieldState: { invalid, error },
          }) => {
            return (
              <View style={[]}>
                <TextField.LabelText>
                  <Text>Part No.</Text>
                </TextField.LabelText>
                <TextField.Root>
                  <TextField.Input
                    onChangeText={onChange}
                    label={`Enter part no.`}
                    defaultValue={`${value}`}
                    isInvalid={invalid}
                  />
                </TextField.Root>
              </View>
            )
          }}
        />
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
        <HStack style={[a.my_md, a.self_end, a.gap_md, a.px_2xl]}>
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
      </ScrollView>

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
})
export default RepairOrderLinePartForm
