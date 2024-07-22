import React, { useCallback, useMemo, useState } from 'react'
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { Text } from '#/components/Typography'
import { useTheme, atoms as a } from '#/theme'
import { useDialogControl } from '#/components/Dialog'

import { useCategoriesQuery } from '#/modules/shared'
import { Button, ButtonText } from '#/components/Button'
import { Select } from '#/components/dialogs/Select'
import { CenteredView } from '#/view/com/util/Views'
import { Menus } from './Menus'
import { EditableUserAvatar } from '#/view/com/util/UserAvatar'
import { CalendarList } from '#/components/CalendarList'
import { DatePicker } from './DatePicker'
import { DateRangedPicker } from '#/components/forms/DateRangePicker'

type StorybookProps = {}
export function Storybook(props: StorybookProps) {
  const t = useTheme()
  return (
    <View style={[a.flex_1, t.atoms.bg]}>
      <StoryBookInner />
      {/* <CalendarList /> */}
    </View>
  )
}

function initialMaxDateSelection() {
  const currentDate = new Date()
  currentDate.setMonth(currentDate.getMonth() + 5)

  return currentDate.toISOString()
}
function StoryBookInner() {
  const t = useTheme()
  const [startDate] = useState(new Date().toISOString())
  const [maxDateSelection] = useState(initialMaxDateSelection)
  const [minDate, setMinDate] = useState(new Date())
  const [maxDate, setMaxDate] = useState(minDate)
  const onConfirm = (date: { start: string; end: string; list: any }) => {
    console.log('onConfirm', date)
  }
  return (
    <CenteredView>
      <Menus />
      <DateRangedPicker horizontalView onConfirm={onConfirm} />
      {/* <DatePicker />
      er horizontalView */}
    </CenteredView>
  )
}
const styles = StyleSheet.create({
  avi: {
    position: 'absolute',
    width: 84,
    height: 84,
    borderWidth: 2,
    borderRadius: 42,
  },
})
