import React, { useCallback, useMemo, useRef, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Text } from '#/components/Typography'
import { useTheme, atoms as a, useBreakpoints } from '#/theme'
import * as Dialog from '#/components/Dialog'
import { ErrorBoundary } from '../util/ErrorBoundary'
import { ErrorScreen } from '../util/error/ErrorScreen'
import { Button, ButtonIcon, ButtonText } from '../Button'
import { useThrottledValue } from '#/modules/appointment/hooks/useThrottledValue'
import { useCategoriesQuery } from '#/modules/shared'
import * as TextField from '#/components/forms/TextField'
import { ArrowLeft_Stroke2_Corner0_Rounded as Arrow } from '#/components/icons/Arrow'
import { MagnifyingGlass2_Stroke2_Corner0_Rounded as Search } from '#/components/icons/MagnifyingGlass2'

import { isWeb } from '#/platform/detection'
import { BottomSheetFlatListMethods } from '@discord/bottom-sheet/src'
import { ListMaybePlaceholder } from '../List'
import { ChevronLeft, ChevronRight } from 'lucide-react-native'
import { color } from '#/theme/tokens'

export type Category = {
  id: number
  name: string
}
type CategorySelectProps = {
  control: Dialog.DialogControlProps
  onClose: () => void
  onSelect: (value: Category) => void
}
export function CategorySelectDialog({
  control,
  onClose,
  onSelect,
}: CategorySelectProps) {
  const t = useTheme()

  const renderErrorBoundary = useCallback(
    (error: any) => <DialogError details={String(error)} />,
    [],
  )
  const onSelectCategory = useCallback(
    (category: Category) => {
      console.log('category', category)
      control.close(() => onSelect({ name: category.name, id: category.id }))
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
        <CategoryList onSelect={onSelectCategory} control={control} />
      </ErrorBoundary>
    </Dialog.Outer>
  )
}

function CategoryList({
  onSelect,
  control,
}: {
  onSelect: (value: Category) => void
  control: Dialog.DialogControlProps
}) {
  const { gtMobile } = useBreakpoints()
  const [undeferredSearch, setSearch] = useState('')
  const search = useThrottledValue(undeferredSearch, 500)
  const t = useTheme()
  const textInputRef = useRef<TextInput>(null)
  const listRef = useRef<BottomSheetFlatListMethods>(null)
  const isSearching = search.length > 0

  const { data, isLoading, isError, refetch } = useCategoriesQuery({
    search: search,
  })
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
    ({ item }: { item: Category }) => {
      return <CategoryItem key={item.id} category={item} onSelect={onSelect} />
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
            style={[a.text_2xl, { backgroundColor: 'red' }]}
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
        data={data ?? []}
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
                errorTitle={`Failed to services category`}
                errorMessage={`Something went wrong.`}
                emptyMessage={
                  isSearching
                    ? `No search results found for "${search}".`
                    : `This category doesn't exist.`
                }
              />
            )}
          </>
        }
        stickyHeaderIndices={[0]}
      />
    </>
  )
}

function CategoryItem({
  category,
  onSelect,
}: {
  category: Category
  onSelect: (value: Category) => void
}) {
  const onPress = useCallback(() => {
    onSelect(category)
  }, [onSelect, category])
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[a.py_2xs, a.flex_row, a.align_center, a.justify_between]}>
      <Text style={[a.text_xl]}>{category.name}</Text>
      <ChevronRight size={24} color={color.gray_600} />
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

const styles = StyleSheet.create({})
