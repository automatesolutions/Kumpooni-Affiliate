import React, { useState } from 'react'
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import * as EmailValidator from 'email-validator'

import { logger } from '#/logger'
import { useModalControls } from '#/state/modals'
import { useSession } from '#/state/session'

import { useWebMediaQueries } from '#/lib/hooks/useWebMediaQueries'
import { cleanError, isNetworkError } from '#/lib/strings/errors'
import { checkAndFormatResetCode } from '#/lib/strings/password'
import { colors, s } from '#/lib/styles'
import { isAndroid, isWeb } from '#/platform/detection'

import { ScrollView, TextInput } from './util'
import { Button, ButtonText } from '#/components/Button'
import { ErrorMessage } from '../error/ErrorMessage'
import { Text } from '#/components/Typography'
import { atoms as a, useTheme } from '#/theme'
import { color } from '#/theme/tokens'
import { supabase } from '#/lib/supabase'

enum Stages {
  RequestCode,
  ChangePassword,
  Done,
}

export const snapPoints = isAndroid ? ['90%'] : ['45%']

export function Component({}: {}) {
  const { session } = useSession()

  const [stage, setStage] = useState<Stages>(Stages.RequestCode)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [resetCode, setResetCode] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const { isMobile } = useWebMediaQueries()
  const { closeModal } = useModalControls()

  const onRequestCode = async () => {
    if (
      !session?.user?.email ||
      !EmailValidator.validate(session?.user?.email)
    ) {
      return setError(`Your email appears to be invalid.`)
    }

    setError('')
    setIsProcessing(true)
    try {
      const { error } = await supabase.auth.reauthenticate()
      console.log('Error onRequestCode', error)
      setStage(Stages.ChangePassword)
    } catch (e: any) {
      const errMsg = e.toString()
      logger.warn('Failed to request password reset', { error: e })
      if (isNetworkError(e)) {
        setError(
          `Unable to contact your service. Please check your Internet connection.`,
        )
      } else {
        setError(cleanError(errMsg))
      }
    } finally {
      setIsProcessing(false)
    }
  }
  const t = useTheme()

  const onChangePassword = async () => {
    const formattedCode = resetCode
    // TODO Better password strength check
    if (!formattedCode || !newPassword) {
      setError(`You have entered an invalid code. It should look like XXXXXX`)
      return
    }

    setError('')
    setIsProcessing(true)
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
        nonce: formattedCode,
      })

      console.log('onChangePassword', data)
      console.log('onChangePasswordError', error)
      // await agent.com.atproto.server.resetPassword({
      //   token: formattedCode,
      //   password: newPassword,
      // })
      setStage(Stages.Done)
    } catch (e: any) {
      const errMsg = e.toString()
      logger.warn('Failed to set new password', { error: e })
      if (isNetworkError(e)) {
        setError(
          'Unable to contact your service. Please check your Internet connection.',
        )
      } else {
        setError(cleanError(errMsg))
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const onBlur = () => {
    const formattedCode = resetCode
    if (!formattedCode) {
      setError(`You have entered an invalid code.`)
      return
    }
    setResetCode(formattedCode)
  }

  return (
    <SafeAreaView style={[a.flex_1, t.atoms.bg]}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          isMobile && styles.containerMobile,
        ]}
        keyboardShouldPersistTaps="handled">
        <View>
          <View style={styles.titleSection}>
            <Text style={[a.text_3xl, styles.title]}>
              {stage !== Stages.Done ? `Change Password` : `Password Changed`}
            </Text>
          </View>

          <Text
            style={[
              a.text_lg,
              t.atoms.text_contrast_medium,
              { marginVertical: 12 },
            ]}>
            {stage === Stages.RequestCode ? (
              <Text style={[a.text_lg]}>
                If you want to change your password, we will send you a code to
                verify that this is your account.
              </Text>
            ) : stage === Stages.ChangePassword ? (
              <Text style={[a.text_lg]}>
                Enter the code you received to change your password.
              </Text>
            ) : (
              <Text style={[a.text_lg]}>
                Your password has been changed successfully!
              </Text>
            )}
          </Text>

          {stage === Stages.RequestCode && (
            <View style={[s.flexRow, s.justifyCenter, s.mt10]}>
              <TouchableOpacity
                testID="skipSendEmailButton"
                onPress={() => setStage(Stages.ChangePassword)}
                accessibilityRole="button"
                accessibilityLabel={`Go to next`}
                accessibilityHint={`Navigates to the next screen`}>
                <Text style={[{ color: color.blue_600 }, a.text_xl, s.pr5]}>
                  Already have a code?
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {stage === Stages.ChangePassword && (
            <View style={[t.atoms.border_contrast_high, styles.group]}>
              <View style={[styles.groupContent]}>
                <FontAwesomeIcon
                  icon="ticket"
                  size={18}
                  style={[styles.groupContentIcon]}
                />
                <TextInput
                  testID="codeInput"
                  style={[styles.textInput]}
                  placeholder={`Reset code`}
                  placeholderTextColor={t.palette.contrast_300}
                  value={resetCode}
                  maxLength={6}
                  keyboardType="numeric"
                  onChangeText={setResetCode}
                  onFocus={() => setError('')}
                  onBlur={onBlur}
                  accessible={true}
                  accessibilityLabel={`Reset Code`}
                  accessibilityHint=""
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="off"
                />
              </View>
              <View
                style={[
                  t.atoms.border_contrast_low,
                  styles.groupContent,
                  styles.groupBottom,
                ]}>
                <FontAwesomeIcon
                  icon="lock"
                  size={18}
                  style={[styles.groupContentIcon]}
                />
                <TextInput
                  testID="codeInput"
                  style={[styles.textInput]}
                  placeholder={`New password`}
                  placeholderTextColor={t.palette.primary_300}
                  onChangeText={setNewPassword}
                  secureTextEntry
                  accessible={true}
                  accessibilityLabel={`New Password`}
                  accessibilityHint=""
                  autoCapitalize="none"
                  autoComplete="new-password"
                />
              </View>
            </View>
          )}
          {error ? (
            <ErrorMessage message={error} style={styles.error} />
          ) : undefined}
        </View>
        <View style={[styles.btnContainer]}>
          {isProcessing ? (
            <View style={styles.btn}>
              <ActivityIndicator color="#fff" />
            </View>
          ) : (
            <View style={{ gap: 10 }}>
              {stage === Stages.RequestCode && (
                <Button
                  testID="requestChangeBtn"
                  variant="solid"
                  color="primary"
                  onPress={onRequestCode}
                  accessibilityLabel={`Request Code`}
                  accessibilityHint=""
                  label={`Request Code`}
                  size="medium"
                  // labelContainerStyle={{ justifyContent: 'center', padding: 4 }}
                  // labelStyle={[s.f18]}
                >
                  <ButtonText style={[a.text_xl]}>Request Code</ButtonText>
                </Button>
              )}
              {stage === Stages.ChangePassword && (
                <Button
                  testID="confirmBtn"
                  variant="solid"
                  color="primary"
                  onPress={onChangePassword}
                  accessibilityLabel={`Next`}
                  accessibilityHint=""
                  label={`Next`}
                  size="medium"
                  // labelContainerStyle={{ justifyContent: 'center', padding: 4 }}
                  // labelStyle={[s.f18]}
                >
                  <ButtonText style={[a.text_xl]}>Next</ButtonText>
                </Button>
              )}
              <Button
                testID="cancelBtn"
                variant="solid"
                color={stage !== Stages.Done ? 'secondary' : 'primary'}
                onPress={() => {
                  closeModal()
                }}
                accessibilityLabel={stage !== Stages.Done ? `Cancel` : `Close`}
                accessibilityHint=""
                size="medium"
                label={stage !== Stages.Done ? `Cancel` : `Close`}
                // labelContainerStyle={{ justifyContent: 'center', padding: 4 }}
                // labelStyle={[s.f18]}
              >
                <ButtonText style={[a.text_xl]}>
                  {stage !== Stages.Done ? `Cancel` : `Close`}
                </ButtonText>
              </Button>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  containerMobile: {
    paddingHorizontal: 36,
    paddingBottom: 35,
  },
  titleSection: {
    paddingTop: isWeb ? 0 : 4,
    paddingBottom: isWeb ? 14 : 10,
  },
  title: {
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 5,
  },
  error: {
    borderRadius: 6,
  },
  textInput: {
    width: '100%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 18,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    padding: 14,
    backgroundColor: colors.black,
  },
  btnContainer: {
    paddingTop: 20,
  },
  group: {
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 20,
  },
  groupLabel: {
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  groupContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupBottom: {
    borderTopWidth: 1,
  },
  groupContentIcon: {
    marginLeft: 16,
    fontSize: 40,
  },
})
