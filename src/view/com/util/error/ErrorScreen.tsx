import React from 'react'
import { Button } from '#/components/Button'
import { Text } from '#/components/Typography'

import {
  FontAwesomeIcon,
  FontAwesomeIconStyle,
} from '@fortawesome/react-native-fontawesome'
import { useTheme, atoms as a } from '#/theme'
import { StyleSheet, View } from 'react-native'
import { CenteredView } from '../Views'

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

  return (
    <>
      <CenteredView testID={testID} style={[styles.outer, t.atoms.bg]}>
        <View style={styles.errorIconContainer}>
          <View style={[styles.errorIcon, t.atoms.bg_contrast_400]}>
            <FontAwesomeIcon
              icon="exclamation"
              style={{ color: t.palette.black } as FontAwesomeIconStyle}
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
              testID="errorScreenTryAgainButton"
              variant="solid"
              label="Error"
              color="primary"
              style={[styles.btn]}
              onPress={onPressTryAgain}
              accessibilityLabel={`Retry`}
              accessibilityHint={`Retries the last action, which errored out`}>
              <FontAwesomeIcon
                icon="arrows-rotate"
                style={{ color: t.palette.primary_100 } as FontAwesomeIconStyle}
                size={16}
              />
              <Text style={[styles.btnText]}>Try Again</Text>
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
