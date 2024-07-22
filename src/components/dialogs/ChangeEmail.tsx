import React, { useCallback, useState } from 'react'
import * as Dialog from '#/components/Dialog'
import { ActivityIndicator, StyleSheet, TextInput, View } from 'react-native'
import { atoms as a, useTheme } from '#/theme'
import { Text } from '../Typography'
import { colors } from '#/lib/styles'
import { isWeb } from '#/platform/detection'
import { ErrorMessage } from '#/view/com/util/error/ErrorMessage'
import { Button, ButtonText } from '../Button'
import { useModalControls } from '#/state/modals'
import { useSession } from '#/state/session'
import * as Toast from '#/view/com/util/Toast'
import { cleanError } from '#/lib/strings/errors'
import { supabase } from '#/lib/supabase'
import { logger } from '#/logger'

enum Stages {
  InputEmail,
  ConfirmCode,
  ConfirmNewEmail,
  Done,
}
export function ChangeEmailDialog({
  control,
}: {
  control: Dialog.DialogControlProps
}) {
  return (
    <Dialog.Outer
      control={control}
      nativeOptions={{
        sheet: {
          snapPoints: ['90%'],
        },
      }}>
      <Dialog.Handle />
      <Dialog.ScrollableInner label={`Change Email`}>
        <ChangeEmailInner control={control} />
      </Dialog.ScrollableInner>
    </Dialog.Outer>
  )
}

function ChangeEmailInner({ control }: { control: Dialog.DialogControlProps }) {
  const [stage, setStage] = useState<Stages>(Stages.InputEmail)
  const { session } = useSession()
  const [confirmationCode, setConfirmationCode] = useState<string>('')
  const [newConfirmationCode, setNewConfirmationCode] = useState<string>('')
  const [email, setEmail] = useState<string>(session?.user?.email ?? '')
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const { openModal, closeModal } = useModalControls()
  const t = useTheme()

  const onClose = useCallback(() => {
    control.close()
  }, [control])
  const onRequestChange = async () => {
    console.log('onRequestChange')
    if (email === session?.user?.email) {
      setError(`Enter your new email above`)
      return
    }
    if (!session?.user?.email) {
      setError('No Session Avaialable')
      return
    }
    setError('')
    setIsProcessing(true)
    try {
      const { data, error } = await supabase.auth.updateUser({
        email: email.trim(),
      })
      console.log('hello World', data)
      if (error) {
        logger.error('Resend Otp Error:', { error })
        throw error
      }
      setStage(Stages.ConfirmCode)
    } catch (e) {
      // let err = cleanError(String(e))
      setError(`Request for email changed failed. Try again later.`)
    } finally {
      setIsProcessing(false)
    }
  }
  const onConfirm = async () => {
    setIsProcessing(true)
    console.log('session.user.email', email)
    console.log('confirmationCOde', confirmationCode.trim())
    try {
      if (!session?.user.email) {
        throw new Error('No Session Available')
      }
      const { data, error } = await supabase.auth.verifyOtp({
        email: session.user.email,
        token: confirmationCode.trim(),
        type: 'email_change',
      })

      if (error) {
        logger.error('Failed to verify', { error })
        throw new Error('Invalid Code')
      }
      logger.debug('VerifyOtp', data)

      setStage(Stages.ConfirmNewEmail)
      Toast.show(`Email updated`)
    } catch (e) {
      setError(cleanError(String(e)))
    } finally {
      setIsProcessing(false)
    }
  }
  const onConfirmNewEmail = async () => {
    setIsProcessing(true)

    try {
      if (!email) {
        throw new Error('No Session Available')
      }
      const { data, error } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: newConfirmationCode.trim(),
        type: 'email_change',
      })

      if (error) {
        logger.error('Failed to verify', { error })
        throw new Error('Invalid Code')
      }
      logger.debug('VerifyOtp', data)

      setStage(Stages.Done)
      Toast.show(`Email updated`)
    } catch (e) {
      setError(cleanError(String(e)))
    } finally {
      setIsProcessing(false)
    }
  }
  const onVerify = useCallback(() => {
    closeModal()
    openModal({ name: 'verify-email' })
  }, [])
  return (
    <View style={[a.px_5xl]}>
      <View style={styles.titleSection}>
        <Text style={[a.text_2xl, styles.title]}>
          {stage === Stages.InputEmail ? `Change Your Email` : ''}
          {stage === Stages.ConfirmCode ? `Security Step Required` : ''}
          {stage === Stages.ConfirmNewEmail
            ? `Verify Your New Email Address`
            : ''}
        </Text>
      </View>

      <Text style={[a.text_lg, { marginBottom: 10, maxWidth: 600 }]}>
        {stage === Stages.InputEmail
          ? 'Enter your new email address below.'
          : stage === Stages.ConfirmCode
          ? `Your code was sent to ${session?.user.email || '(no email)'}.`
          : stage === Stages.ConfirmNewEmail
          ? `Your code was sent to your new email ${email || '(no email)'}`
          : ` Your email has been changed successfully!`}
      </Text>

      {stage === Stages.InputEmail && (
        <TextInput
          testID="emailInput"
          style={[styles.textInput, t.atoms.border_contrast_low]}
          placeholder="alice@mail.com"
          placeholderTextColor={t.palette.contrast_300}
          value={email}
          onChangeText={setEmail}
          accessible={true}
          accessibilityLabel={`Email`}
          accessibilityHint=""
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
        />
      )}
      {stage === Stages.ConfirmCode && (
        <TextInput
          testID="confirmCodeInput"
          style={[styles.textInput, t.atoms.border_contrast_low]}
          placeholder="XXXXXX"
          placeholderTextColor={t.palette.contrast_300}
          value={confirmationCode}
          onChangeText={setConfirmationCode}
          accessible={true}
          maxLength={6}
          accessibilityLabel={`Confirmation code`}
          accessibilityHint=""
          autoCapitalize="none"
          autoComplete="off"
          keyboardType="number-pad"
          autoCorrect={false}
        />
      )}
      {stage === Stages.ConfirmNewEmail && (
        <TextInput
          testID="confirmNewCodeInput"
          style={[styles.textInput, t.atoms.border_contrast_low]}
          placeholder="XXXXXX"
          placeholderTextColor={t.palette.contrast_300}
          value={newConfirmationCode}
          onChangeText={setNewConfirmationCode}
          accessible={true}
          maxLength={6}
          accessibilityLabel={`Confirmation code`}
          accessibilityHint=""
          autoCapitalize="none"
          autoComplete="off"
          keyboardType="number-pad"
          autoCorrect={false}
        />
      )}
      {error ? (
        <ErrorMessage message={error} style={styles.error} />
      ) : undefined}

      <View style={[styles.btnContainer]}>
        {isProcessing ? (
          <View style={styles.btn}>
            <ActivityIndicator color="#fff" />
          </View>
        ) : (
          <View style={{ gap: 14 }}>
            {stage === Stages.InputEmail && (
              <Button
                testID="requestChangeBtn"
                color="primary"
                variant="solid"
                onPress={onRequestChange}
                accessibilityLabel={`Request Change`}
                accessibilityHint=""
                size="small"
                style={[{ width: 500 }, a.rounded_full, a.self_center]}
                label={`Request Change`}>
                <ButtonText style={[a.text_lg]}>Request Change</ButtonText>
              </Button>
            )}
            {stage === Stages.ConfirmCode && (
              <Button
                testID="confirmBtn"
                variant="solid"
                color="primary"
                onPress={onConfirm}
                accessibilityLabel={`Confirm Change`}
                accessibilityHint=""
                size="small"
                style={[{ width: 500 }, a.rounded_full, a.self_center]}
                label={`Confirm Change`}>
                <ButtonText style={[a.text_lg]}>Confirm Change</ButtonText>
              </Button>
            )}
            {stage === Stages.ConfirmNewEmail && (
              <Button
                testID="confirmBtn"
                variant="solid"
                color="primary"
                onPress={onConfirmNewEmail}
                accessibilityLabel={`Confirm`}
                accessibilityHint=""
                size="small"
                style={[{ width: 500 }, a.rounded_full, a.self_center]}
                label={`Confirm`}>
                <ButtonText style={[a.text_lg]}>Confirm</ButtonText>
              </Button>
            )}

            <Button
              testID="cancelBtn"
              color={stage !== Stages.Done ? 'secondary' : 'primary'}
              variant="solid"
              onPress={onClose}
              accessibilityLabel={stage !== Stages.Done ? `Cancel` : `Close`}
              accessibilityHint=""
              label={stage !== Stages.Done ? `Cancel` : `Close`}
              size={'small'}
              style={[{ width: 500 }, a.rounded_full, a.self_center]}>
              <ButtonText
                style={[
                  a.text_lg,
                  stage === Stages.Done ? t.atoms.text_inverted : t.atoms.text,
                ]}>
                {stage !== Stages.Done ? `Cancel` : `Close`}
              </ButtonText>
            </Button>
          </View>
        )}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
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
    marginTop: 10,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 32,
    padding: 14,
    width: 500,
    backgroundColor: colors.black,
  },
  btnContainer: {
    paddingTop: 20,
  },
})
