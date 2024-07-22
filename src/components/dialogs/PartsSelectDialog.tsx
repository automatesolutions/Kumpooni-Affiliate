import React, { useCallback, useMemo, useRef, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Text } from '#/components/Typography'
import { useTheme, atoms as a, useBreakpoints } from '#/theme'
import * as Dialog from '#/components/Dialog'

import { useThrottledValue } from '#/modules/appointment/hooks/useThrottledValue'

import * as TextField from '#/components/forms/TextField'
import { ArrowLeft_Stroke2_Corner0_Rounded as Arrow } from '#/components/icons/Arrow'
import { MagnifyingGlass2_Stroke2_Corner0_Rounded as Search } from '#/components/icons/MagnifyingGlass2'

import { isWeb } from '#/platform/detection'
import { BottomSheetFlatListMethods } from '@discord/bottom-sheet/src'

import { Button, ButtonIcon, ButtonText } from '#/components/Button'
import { ErrorScreen } from '#/components/util/error/ErrorScreen'
import { ListMaybePlaceholder } from '#/components/List'
import { ErrorBoundary } from '#/components/util/ErrorBoundary'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '#/lib/supabase'
import { logger } from '#/logger'
import { useSession } from '#/state/session'

import { useInteractionState } from '#/components/hooks/useInteractionState'
import { Parts } from '#/modules/shared/types'
import { usePartsQuery } from '#/modules/shared'

type PartsSelectProps = {
  control: Dialog.DialogControlProps
  onClose: () => void
  onSelect: (value: Parts) => void
}
export function PartsSelectDialog({
  control,
  onClose,
  onSelect,
}: PartsSelectProps) {
  const t = useTheme()

  const renderErrorBoundary = useCallback(
    (error: any) => <DialogError details={String(error)} />,
    [],
  )
  const onSelectPart = useCallback(
    (part: Parts) => {
      control.close(() => onSelect(part))
    },
    [control, onSelect],
  )
  return (
    <Dialog.Outer
      control={control}
      nativeOptions={{
        sheet: {
          snapPoints: ['80%'],
        },
      }}
      onClose={onClose}>
      <Dialog.Handle />
      <ErrorBoundary renderError={renderErrorBoundary}>
        <PartsList onSelect={onSelectPart} control={control} />
      </ErrorBoundary>
    </Dialog.Outer>
  )
}

function PartsList({
  onSelect,
  control,
}: {
  onSelect: (value: Parts) => void
  control: Dialog.DialogControlProps
}) {
  const { gtMobile } = useBreakpoints()
  const [undeferredSearch, setSearch] = useState('')
  const search = useThrottledValue(undeferredSearch, 500)
  const t = useTheme()
  const textInputRef = useRef<TextInput>(null)
  const listRef = useRef<BottomSheetFlatListMethods>(null)
  const isSearching = search.length > 0
  const { session } = useSession()

  const { data, isLoading, isError, refetch } = usePartsQuery(session?.store_id)

  const filterdSearch = useMemo(() => {
    if (!data) return []
    const lowercasedSearch = search.toLowerCase()
    return (data ?? []).filter(
      option => option?.name.toLowerCase().includes(lowercasedSearch), // assuming objects have a 'name' property
    )
  }, [data, search])

  // console.log('ServicesList', data)
  // const { data, isLoading, isError, refetch } = useCategoriesQuery({
  //   search: search,
  // })
  const hasData = (data ?? []).length > 0
  const onGoBack = useCallback(() => {
    if (isSearching) {
      // clear the input and reset the state
      textInputRef.current?.clear()
      setSearch('')
    } else {
      control.close()
    }
  }, [control, isSearching])
  const renderItem = useCallback(
    ({ item }: { item: Parts }) => {
      return <ServiceItem key={item.id} part={item} onSelect={onSelect} />
    },
    [onSelect],
  )
  const listHeader = useMemo(() => {
    return (
      <View
        style={[
          a.relative,
          a.mb_lg,
          a.flex_row,
          a.align_center,
          !gtMobile && isWeb && a.gap_md,
        ]}>
        {/* cover top corners */}
        <View
          style={[
            a.absolute,
            a.inset_0,
            {
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            },
            t.atoms.bg,
          ]}
        />

        {!gtMobile && isWeb && (
          <Button
            size="small"
            variant="ghost"
            color="secondary"
            shape="round"
            onPress={() => control.close()}
            label={`Close Services Selection dialog`}>
            <ButtonIcon icon={Arrow} size="md" />
          </Button>
        )}

        <TextField.Root>
          <TextField.Icon icon={Search} size="lg" />
          <TextField.Input
            label={`Search`}
            placeholder={`Search`}
            onChangeText={text => {
              setSearch(text)
              listRef.current?.scrollToOffset({ offset: 0, animated: false })
            }}
            style={[a.text_2xl]}
            returnKeyType="search"
            clearButtonMode="while-editing"
            inputRef={textInputRef}
            maxLength={50}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Escape') {
                control.close()
              }
            }}
          />
        </TextField.Root>
      </View>
    )
  }, [])
  return (
    <>
      {gtMobile && <Dialog.Close />}
      <Dialog.InnerFlatList
        data={filterdSearch ?? []}
        style={[a.flex_1]}
        contentContainerStyle={[a.px_2xl]}
        renderItem={renderItem}
        ListHeaderComponent={
          <>
            {listHeader}
            {!hasData && (
              <ListMaybePlaceholder
                isLoading={isLoading}
                isError={isError}
                onRetry={refetch}
                onGoBack={onGoBack}
                emptyType="results"
                sideBorders={false}
                topBorder={false}
                errorTitle={`Failed to fetch services`}
                errorMessage={`Something went wrong.`}
                emptyMessage={
                  isSearching
                    ? `No search results found for "${search}".`
                    : `The Service does not exist`
                }
              />
            )}
          </>
        }
        stickyHeaderIndices={[0]}
      />
      {/* <View style={[a.flex_1, a.flex_row]}>
        <View style={[a.px_2xl, { flex: 0.4, marginTop: 40 }]}>

        </View>
       
      </View> */}
    </>
  )
}

function ServiceItem({
  part,
  onSelect,
}: {
  part: Parts
  onSelect: (value: Parts) => void
}) {
  const [isSelect, setSelect] = useState(true)
  // const {
  //   state: hovered,
  //   onIn: onHoverIn,
  //   onOut: onHoverOut,
  // } = useInteractionState()

  const {
    state: pressed,
    onIn: onPressIn,
    onOut: onPressOut,
  } = useInteractionState()

  const onPress = useCallback(() => {
    onSelect(part)
  }, [onSelect, part])
  return (
    <TouchableOpacity
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      style={[a.py_2xs, a.flex_row, a.align_center, a.gap_sm]}>
      <Radio selected={pressed} />
      <Text style={[a.text_xl]}>{part.name}</Text>
    </TouchableOpacity>
  )
}

function DialogError({ details }: { details?: string }) {
  const control = Dialog.useDialogContext()
  return (
    <Dialog.ScrollableInner style={a.gap_md} label={`An error occured`}>
      <Dialog.Close />
      <ErrorScreen
        title={`Oh no!`}
        message={`There was an unexpected issue in the application. Please let us know if this happened to you!`}
        details={details}
      />
      <Button
        label={`Close dialog`}
        onPress={() => control.close()}
        color="primary"
        size="medium"
        variant="solid">
        <ButtonText>
          <Text>Close</Text>
        </ButtonText>
      </Button>
    </Dialog.ScrollableInner>
  )
}

function Radio({ selected }: { selected: boolean }) {
  const t = useTheme()

  return (
    <View
      style={[
        a.justify_center,
        a.align_center,
        a.border,
        a.rounded_full,
        t.atoms.border_contrast_high,
        {
          height: 20,
          width: 20,
        },
      ]}>
      {selected ? (
        <View
          style={[
            a.absolute,
            a.rounded_full,
            { height: 12, width: 12 },
            selected
              ? {
                  backgroundColor: t.palette.primary_500,
                }
              : {},
          ]}
        />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({})
