import React, { useState, useCallback } from 'react'
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import {
  FontAwesomeIcon,
  FontAwesomeIconStyle,
} from '@fortawesome/react-native-fontawesome'
import { isIOS, isAndroid } from '#/platform/detection'

import DatePicker from 'react-native-date-picker'
import { useTheme, atoms as a } from '#/theme'
import { Text } from '../Typography'
import { color } from '#/theme/tokens'
import { Button, ButtonVariant } from '../Button'
import dayjs from 'dayjs'

interface Props {
  testID?: string
  value: Date
  onChange: (date: Date) => void
  buttonVariant?: ButtonVariant
  buttonStyle?: StyleProp<ViewStyle>
  buttonLabelStyle?: StyleProp<TextStyle>
  label?: string
  mode: 'date' | 'time' | 'datetime'
  accessibilityLabel: string
  accessibilityHint: string
  accessibilityLabelledBy?: string
  handleAsUTC?: boolean
}

export function DateInput({ label = 'Show Date', ...props }: Props) {
  const [show, setShow] = useState(false)

  //   const formatter = React.useMemo(() => {
  //     return new Intl.DateTimeFormat('en-US', {
  //       timeZone: props.handleAsUTC ? 'UTC' : undefined,
  //       year: 'numeric',
  //       month: '2-digit',
  //       day: '2-digit',
  //       hour: 'numeric',
  //       minute: 'numeric',
  //       hour12: true,
  //     })
  //   }, [props.handleAsUTC])

  const onChangeInternal = useCallback(
    (date: Date) => {
      setShow(false)
      props.onChange(date)
    },
    [setShow, props],
  )

  const onPress = useCallback(() => {
    console.log('onPressDate')
    setShow(true)
  }, [setShow])

  const onCancel = useCallback(() => {
    setShow(false)
  }, [])
  console.log('isAndroid', isAndroid)
  console.log('props.value', props.value)
  return (
    <View>
      {isAndroid && (
        <Button
          label={label}
          variant={props.buttonVariant}
          style={props.buttonStyle}
          onPress={onPress}
          accessibilityLabel={props.accessibilityLabel}
          accessibilityHint={props.accessibilityHint}
          accessibilityLabelledBy={props.accessibilityLabelledBy}>
          <View style={styles.button}>
            {/* <FontAwesomeIcon
              icon={['far', 'calendar']}
              style={{ color: color.gray_700 } as FontAwesomeIconStyle}
            /> */}
            <Text style={[{ color: color.blue_700 }]}>{`${dayjs(
              props.value,
            ).format('MM/DD/YYYY')} at ${dayjs(props.value).format(
              'h:mm A',
            )}`}</Text>

            <Text style={[{ color: color.blue_700 }]}>Schedule</Text>
            {/* <Text
              style={[
                a.text_lg,
                { color: color.gray_700 },
                props.buttonLabelStyle,
              ]}>
              {formatter.format(props.value)}
            </Text> */}
          </View>
        </Button>
      )}
      {(isIOS || show) && (
        <DatePicker
          timeZoneOffsetInMinutes={0}
          modal={isAndroid}
          open={isAndroid}
          theme={'light'}
          date={props.value}
          onConfirm={onChangeInternal}
          onCancel={onCancel}
          mode={props.mode}
          testID={props.testID ? `${props.testID}-datepicker` : undefined}
          accessibilityLabel={props.accessibilityLabel}
          accessibilityHint={props.accessibilityHint}
          accessibilityLabelledBy={props.accessibilityLabelledBy}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
})
