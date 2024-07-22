import {
  ActivityIndicator,
  BackHandler,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import * as TextField from '#/components/forms/TextField'
import { Text } from '#/components/Typography'
import { SelectPartsBtn } from '#/components/Parts/SelectPartsBtn'
import { atoms as a, useTheme } from '#/theme'

import {
  ServiceLinePartSchema,
  serviceLinePartValidator,
} from '#/modules/parts/parts.model'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { HStack } from '#/components/HStack'
import { color } from '#/theme/tokens'
import { z } from 'zod'
import { partsValidator } from '#/state/validations/parts'
import { useUpsertPartMutation } from '#/state/queries/parts'
import { useModalControls } from '#/state/modals'
import { logger } from '#/logger'
import React, { useMemo } from 'react'
import { isAndroid } from '#/platform/detection'
import { Required } from '#/components/Required'
import { usePartsCategoryQuery } from '#/state/queries/category'
import { Select } from '#/components/dialogs/Select'

export const snapPoints = ['90%']

type Part = z.infer<typeof partsValidator>

export function Component({
  part,
  onUpdate,
}: {
  part: z.infer<typeof partsValidator>
  onUpdate?: () => void
}) {
  const { control, handleSubmit, watch, setValue } = useForm({
    resolver: zodResolver(partsValidator),
    defaultValues: part,
  })
  const { data: category, isLoading, isError } = usePartsCategoryQuery()
  const options = useMemo(() => {
    if (!category) return []
    return category.map(cat => ({
      value: cat.id,
      label: cat.name,
    }))
  }, [category])
  const { closeModal } = useModalControls()
  const t = useTheme()
  const upsertPart = useUpsertPartMutation()

  const onSubmit = async (rawInput: z.infer<typeof partsValidator>) => {
    try {
      await upsertPart.mutateAsync({ part: rawInput })
      onUpdate?.()
      closeModal()
    } catch (e) {
      logger.error('Failed to upsert part', { message: String(e) })
    }
  }
  const isEditing = part.id !== undefined
  React.useEffect(() => {
    let listener = { remove() {} }
    if (isAndroid) {
      listener = BackHandler.addEventListener('hardwareBackPress', () => {
        return closeModal()
      })
    }
    return () => {
      listener.remove()
    }
  }, [closeModal])
  return (
    <KeyboardAvoidingView behavior="height">
      <View
        style={[a.border_b, t.atoms.border_contrast_low, a.pb_xs, a.mx_5xl]}>
        <Text style={[a.text_xl, a.font_bold]}>
          {isEditing ? 'Edit Part' : 'Add Part'}
        </Text>
      </View>
      <ScrollView
        style={[]}
        contentContainerStyle={[
          a.mx_5xl,
          a.border,
          a.p_lg,
          a.mt_lg,
          a.rounded_md,
          t.atoms.border_contrast_high,
        ]}>
        <HStack style={[a.flex_1, a.flex_row, a.gap_sm]}>
          <Controller
            control={control}
            name="name"
            render={({
              field: { onChange, value },
              fieldState: { invalid },
            }) => {
              return (
                <View style={[a.flex_1, styles.formBox]}>
                  <TextField.LabelText>
                    <Text style={[a.font_bold, a.text_lg]}>
                      Name <Required style={[a.text_lg]} />
                    </Text>
                  </TextField.LabelText>
                  <TextField.Root>
                    <TextField.Input
                      onChangeText={onChange}
                      label={`Enter part name`}
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
            name="part_no"
            render={({
              field: { value, onChange },
              fieldState: { invalid, error },
            }) => {
              return (
                <View style={[a.flex_1, styles.formBox]}>
                  <TextField.LabelText>
                    <Text style={[a.font_bold, a.text_lg]}>Part No.</Text>
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
            name="category_id"
            render={({
              field: { value, onChange },
              fieldState: { invalid, error },
            }) => {
              return (
                <View style={[a.flex_1, styles.formBox]}>
                  <TextField.LabelText>
                    <Text style={[a.font_bold, a.text_lg]}>Category</Text>
                  </TextField.LabelText>
                  <Select
                    onChange={onChange}
                    options={options}
                    value={value}
                    placeholder="Select category"
                  />
                </View>
              )
            }}
          />
        </HStack>
        <HStack style={[a.flex_1, a.flex_row, a.gap_sm]}>
          <Controller
            control={control}
            name="brand"
            render={({
              field: { value, onChange },
              fieldState: { invalid, error },
            }) => {
              return (
                <View style={[a.flex_1, styles.formBox]}>
                  <TextField.LabelText>
                    <Text style={[a.font_bold, a.text_lg]}>Brand</Text>
                  </TextField.LabelText>
                  <TextField.Root>
                    <TextField.Input
                      onChangeText={onChange}
                      label={`Enter brand`}
                      defaultValue={`${value ?? ''}`}
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
                <View style={[a.flex_1, styles.formBox]}>
                  <TextField.LabelText>
                    <Text style={[a.font_bold, a.text_lg]}>Price</Text>
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

          <Controller
            control={control}
            name="description"
            render={({
              field: { value, onChange },
              fieldState: { invalid, error },
            }) => {
              return (
                <View style={[a.flex_1, styles.formBox]}>
                  <TextField.LabelText>
                    <Text style={[a.font_bold, a.text_lg]}>Description</Text>
                  </TextField.LabelText>
                  <TextField.Root>
                    <TextField.Input
                      onChangeText={onChange}
                      label={``}
                      defaultValue={`${value ?? ''}`}
                      isInvalid={invalid}
                    />
                  </TextField.Root>
                </View>
              )
            }}
          />
        </HStack>

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
            {upsertPart.isPending && (
              <ActivityIndicator size={'small'} color={'#fff'} />
            )}
            <Text style={styles.textBtn}> Save </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              closeModal()
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
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 5,
    width: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  textBtn: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  formBox: {
    marginTop: 10,
  },
})
