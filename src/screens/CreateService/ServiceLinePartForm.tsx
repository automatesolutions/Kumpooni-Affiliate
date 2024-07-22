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

import { Text } from '#/components/Typography'
import { color } from '#/theme/tokens'
import { HStack } from '#/components/HStack'
import * as TextField from '#/components/forms/TextField'

import { useSidebarControls } from '#/state/shell/sidebar'
import {
  ServiceLinePartSchema,
  serviceLinePartValidator,
} from '#/modules/parts/parts.model'

import { SelectOption } from '#/components/dialogs/Select/types'
import { useServiceParts } from '#/state/store/service-parts'
import { Parts } from '#/modules/shared/types'
import { SelectPartsBtn } from '#/components/Parts/SelectPartsBtn'

type ServiceLinePartFormProps = {
  initialValues: ServiceLinePartSchema | undefined
  options: SelectOption<Parts>[]
}

const ServiceLinePartForm = ({
  initialValues,
  options,
}: ServiceLinePartFormProps) => {
  const t = useTheme()
  const { parts, addPart, editPart } = useServiceParts(state => ({
    parts: state.parts,
    addPart: state.addPart,
    editPart: state.editPart,
  }))
  const { closeSidebar } = useSidebarControls()

  const { control, handleSubmit, watch, setValue } = useForm({
    resolver: zodResolver(serviceLinePartValidator),
    defaultValues: initialValues,
  })

  const onSubmit: SubmitHandler<ServiceLinePartSchema> = input => {
    if (input.id) {
      editPart(input.id, input)
      console.log('editPart')
    } else {
      console.log('addPart')
      addPart({ ...input, id: input.part_id })
    }
    closeSidebar()
  }

  return (
    <ScrollView>
      <View style={[a.gap_xs, a.px_2xl, a.mt_sm]}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value }, fieldState: { invalid } }) => {
            return (
              <View>
                <TextField.LabelText>
                  <Text>Service Part</Text>
                </TextField.LabelText>
                <SelectPartsBtn
                  value={value.length > 0 ? value : 'Select Parts'}
                  onClose={() => console.log('Closing Category Dialog')}
                  onSelect={value => {
                    onChange(value.name)
                    setValue('part_id', value.id)
                    setValue('price', value.price)
                    setValue('part_no', value.part_no)
                  }}
                />
              </View>
            )
          }}
        />

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
                    defaultValue={`${value ? value : ''}`}
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
                  <Text>Price</Text>
                </TextField.LabelText>
                <TextField.Root>
                  <TextField.Input
                    onChangeText={onChange}
                    label={`Enter price`}
                    defaultValue={`${value}`}
                    keyboardType="numeric"
                    isInvalid={invalid}
                  />
                </TextField.Root>
              </View>
            )
          }}
        />
      </View>
      <HStack style={[a.my_md, a.self_end, a.gap_md, a.pr_2xl]}>
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
          {false && <ActivityIndicator size={'small'} color={'#fff'} />}
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
      {/* )} */}
    </ScrollView>
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
export default ServiceLinePartForm
