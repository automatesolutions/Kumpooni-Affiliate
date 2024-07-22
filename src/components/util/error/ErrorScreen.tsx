import React from 'react'
import { StyleSheet, View } from 'react-native'
import {
  FontAwesomeIcon,
  FontAwesomeIconStyle,
} from '@fortawesome/react-native-fontawesome'

import { useTheme, atoms as a } from '#/theme'

import { CenteredView } from '#/view/com/util/Views'
import { Text } from '#/components/Typography'
import { Button } from '#/components/Button'
import { color } from '#/theme/tokens'
import { useWebMediaQueries } from '#/lib/hooks/useWebMediaQueries'
import { ViewHeader } from '../ViewHeader'

export function ErrorScreen({
  title,
  message,
  details,
  onPressTryAgain,
  testID,
  showHeader,
}: {
  title: string
  message: string
  details?: string
  onPressTryAgain?: () => void
  testID?: string
  showHeader?: boolean
}) {
  const t = useTheme()
  const { isMobile } = useWebMediaQueries()

  return (
    <>
      {showHeader && isMobile && <ViewHeader title="Error" showBorder />}
      <CenteredView testID={testID} style={[styles.outer, t.atoms.bg]}>
        <View style={styles.errorIconContainer}>
          <View
            style={[
              styles.errorIcon,
              { backgroundColor: t.palette.contrast_400 },
            ]}>
            <FontAwesomeIcon
              icon="exclamation"
              style={t.palette.black as FontAwesomeIconStyle}
              size={24}
            />
          </View>
        </View>
        <Text style={[styles.title]}>{title}</Text>
        <Text style={[styles.message]}>{message}</Text>
        {details && (
          <Text testID={`${testID}-details`} style={[styles.details]}>
            {details}
          </Text>
        )}
        {onPressTryAgain && (
          <View style={styles.btnContainer}>
            <Button
              label="Retry"
              testID="errorScreenTryAgainButton"
              style={[styles.btn]}
              onPress={onPressTryAgain}
              accessibilityLabel={`Retry`}
              accessibilityHint={`Retries the last action, which errored out`}>
              <FontAwesomeIcon
                icon="arrows-rotate"
                style={color.blue_600 as FontAwesomeIconStyle}
                size={16}
              />
              <Text style={[styles.btnText, { color: color.blue_600 }]}>
                <Text>Try again</Text>
              </Text>
            </Button>
          </View>
        )}
      </CenteredView>
    </>
  )
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 14,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 22,
    fontWeight: '500',
  },
  message: {
    textAlign: 'center',
    marginBottom: 20,
  },
  details: {
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    overflow: 'hidden',
    marginBottom: 20,
    color: 'red',
  },
  btnContainer: {
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  btnText: {
    marginLeft: 5,
    fontWeight: '500',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  errorIconContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  errorIcon: {
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
