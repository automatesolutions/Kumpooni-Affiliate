import React, { useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { Text } from '#/components/Typography'
import * as TextField from '#/components/forms/TextField'
import { useTheme, atoms as a } from '#/theme'
import { CommonNavigatorParams, NavigationProp } from '#/lib/routes/types'
import { SelectServiceBtn } from '#/components/Services/SelectServiceBtn'
import { Controller, useForm } from 'react-hook-form'
import {
  AddServiceSchema,
  addServiceValidator,
} from '#/modules/services/services.model'
import { zodResolver } from '@hookform/resolvers/zod'
import { ServiceLineParts } from './ServiceLineParts'
import { ServiceSidebar } from './Sidebar'
import { useSession } from '#/state/session'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useServiceParts } from '#/state/store/service-parts'
import { HStack } from '#/components/HStack'
import { Button } from '#/components/Button'

import { useInsertServiceMutation, useServiceQuery } from '#/modules/services'

type Props = NativeStackScreenProps<
  CommonNavigatorParams,
  'CreateOrEditService'
>

export function CreateServiceScreen({ route }: Props) {
  const serviceId = route.params?.id
  const { clearParts } = useServiceParts(state => ({
    clearParts: state.clearParts,
    setParts: state.setParts,
  }))
  const { data, isLoading } = useServiceQuery(serviceId)

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        clearParts()
      }
    }, [clearParts]),
  )

  if (isLoading) {
    return (
      <View style={[a.flex_1, a.justify_center, a.align_center]}>
        <ActivityIndicator size={'large'} />
      </View>
    )
  }
  return (
    <ServiceSidebar>
      {data ? (
        <CreateServiceInner initialValues={data} serviceId={serviceId} />
      ) : null}
    </ServiceSidebar>
  )
}

function CreateServiceInner({
  initialValues,
  serviceId,
}: {
  initialValues: AddServiceSchema
  serviceId: number | undefined
}) {
  const t = useTheme()
  const { control, setValue, handleSubmit, watch } = useForm<AddServiceSchema>({
    resolver: zodResolver(addServiceValidator),
    defaultValues: initialValues,
  })
  const isDisabled = serviceId ? true : false
  const navigation = useNavigation<NavigationProp>()
  const { session } = useSession()

  const { parts, setParts } = useServiceParts(state => ({
    setParts: state.setParts,
    parts: state.parts,
  }))

  const insertService = useInsertServiceMutation()
  const onSubmit = (rawInput: AddServiceSchema) => {
    const { categories, category_id, description, price, service } = rawInput

    const total = parts.reduce(
      (accumulator, part) => accumulator + part.price * part.quantity,
      0,
    )

    try {
      insertService.mutateAsync(
        {
          ...service!,
          status: 'Active',
          price: total + price,
          category_id: category_id,
          description: description,
          categories: categories,
          store_id: session?.store_id!,
          parts: parts,
        },
        {
          onSettled: () => {
            navigation.navigate('Services')
          },
        },
      )
    } catch (error) {}
  }

  const onSaveDraft = async (rawInput: AddServiceSchema) => {
    const { categories, category_id, description, price, service } = rawInput
    try {
      const total = parts.reduce(
        (accumulator, part) => accumulator + part.price * part.quantity,
        0,
      )
      await insertService.mutateAsync(
        {
          ...service!,
          price: total + price,
          categories: categories,
          status: 'Draft',
          store_id: session?.store_id!,
          parts,
        },
        {
          onSuccess: () => {},
          onSettled: () => {
            navigation.navigate('Services')
          },
        },
      )
    } catch (error) {}
  }

  useEffect(() => {
    if (serviceId && initialValues.service?.parts) {
      setParts(initialValues.service?.parts)
    }
  }, [setParts])

  return (
    <View style={[a.flex_1, t.atoms.bg]}>
      <View style={[a.py_2xs, a.mx_lg, a.mt_lg]}>
        <Text style={[a.text_xl, a.font_bold]}>
          {serviceId ? 'Edit Service' : 'Add Service'}
        </Text>
      </View>
      <View
        style={[
          a.mx_lg,
          a.px_lg,
          a.pb_2xl,
          a.border,
          a.rounded_sm,
          a.mb_2xl,
          t.atoms.border_contrast_medium,
        ]}>
        <View style={[a.mt_sm]}>
          <View style={[a.flex_row, a.gap_md]}>
            <Controller
              control={control}
              name="service"
              render={({
                field: { value, onChange },
                fieldState: { invalid },
              }) => (
                <View style={[a.flex_1]}>
                  <TextField.LabelText style={[a.text_lg]}>
                    Service name
                  </TextField.LabelText>
                  <SelectServiceBtn
                    value={
                      value.name.length > 0 ? value.name : 'Select Service'
                    }
                    disabled={isDisabled}
                    onClose={() => console.log('Closing Category Dialog')}
                    onSelect={value => {
                      onChange({
                        name: value.name,
                        source_id: value.id,
                        description: value.description,
                        category_id: value.category_id,
                        inclusion: value.inclusion,
                        is_active: value.is_active,
                        is_car_required: value.is_car_required,
                        price: value.price,
                        service_type: value.service_type,
                        status: value.status,
                        type: value.type,
                        img_url: value.img_url,
                      })
                      setValue('category_id', value.category_id)
                      setValue('category_name', value.categories?.name)
                      setValue('price', value.price)
                      setValue('description', value.description)
                    }}
                  />
                </View>
              )}
            />
            <Controller
              control={control}
              name="category_name"
              render={({
                field: { value, onChange },
                fieldState: { invalid },
              }) => (
                <View style={[a.flex_1]}>
                  <TextField.LabelText style={[a.text_lg]}>
                    Service Category
                  </TextField.LabelText>
                  <TextField.Root>
                    <TextField.Input
                      defaultValue={`${value ?? 'Select category'}`}
                      isInvalid={invalid}
                      onChangeText={onChange}
                      label="Category"
                      keyboardType="numeric"
                      editable={isDisabled}
                    />
                  </TextField.Root>
                </View>
              )}
            />

            <Controller
              control={control}
              name="price"
              render={({
                field: { value, onChange },
                fieldState: { invalid },
              }) => (
                <View style={[a.flex_1]}>
                  <TextField.LabelText style={[a.text_lg]}>
                    Price
                  </TextField.LabelText>
                  <TextField.Root>
                    <TextField.SuffixText label="Pesos">
                      PHP
                    </TextField.SuffixText>
                    <TextField.Input
                      defaultValue={`${value}`}
                      isInvalid={invalid}
                      onChangeText={onChange}
                      label="Price"
                      keyboardType="numeric"
                    />
                  </TextField.Root>
                </View>
              )}
            />
          </View>
          <View style={[a.flex_row, a.gap_md, a.mt_2xs]}>
            <Controller
              control={control}
              name="description"
              render={({
                field: { onChange, value },
                fieldState: { invalid },
              }) => (
                <View style={[{ flex: 0.5 }]}>
                  <TextField.LabelText style={[a.text_lg]}>
                    Description
                  </TextField.LabelText>
                  <TextField.Root>
                    <TextField.Input
                      value={value ?? ''}
                      multiline
                      onChangeText={onChange}
                      isInvalid={invalid}
                      label="Enter the description of the service"
                    />
                  </TextField.Root>
                </View>
              )}
            />
          </View>
        </View>
        <ServiceLineParts storeId={session?.store_id!} serviceId={serviceId} />
        <HStack
          style={[
            a.self_end,
            a.justify_center,
            a.align_center,
            a.gap_2xs,
            a.mt_2xl,
          ]}>
          <Button
            onPress={handleSubmit(onSaveDraft)}
            style={[a.py_2xs, a.rounded_xs, { width: 150 }]}
            variant="solid"
            label="Cancel"
            color="secondary">
            {insertService.isPending ? (
              <View>
                <ActivityIndicator size={'small'} color={'#000'} />
              </View>
            ) : (
              <Text style={[a.font_bold]}>Save as a draft</Text>
            )}
          </Button>

          <Button
            style={[a.py_2xs, a.rounded_xs, a.flex_row, { width: 170 }]}
            variant="solid"
            label="Submit"
            color="primary"
            onPress={handleSubmit(onSubmit)}>
            {insertService.isPending ? (
              <View>
                <ActivityIndicator size={'small'} color={'#fff'} />
              </View>
            ) : (
              <Text style={[a.font_bold, t.atoms.text_inverted]}>
                Publish Service
              </Text>
            )}
          </Button>
        </HStack>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    letterSpacing: 0.25,
    color: '#000',
  },
})
