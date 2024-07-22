import React, { useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native'

import { logger } from '#/logger'
import { useModalControls } from '#/state/modals'

import { useWebMediaQueries } from '#/lib/hooks/useWebMediaQueries'
import { cleanError } from '#/lib/strings/errors'
import { colors, s } from '#/lib/styles'
import { isWeb } from '#/platform/detection'
import { useSession } from '#/state/session'
import * as Toast from '#/view/com/util/Toast'
import { ErrorMessage } from '../error/ErrorMessage'
import { Button, ButtonText } from '#/components/Button'
import { Text } from '#/components/Typography'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useTheme, atoms as a } from '#/theme'
import { ScrollView } from 'react-native-gesture-handler'
import { TextInput } from './util'
export const snapPoints = ['90%']

enum Stages {
  Reminder,
  Email,
  ConfirmCode,
}

export function Component({
  showReminder,
  onSuccess,
}: {
  showReminder?: boolean
  onSuccess?: () => void
}) {
  const { session } = useSession()
  const t = useTheme()
  const [stage, setStage] = useState<Stages>(
    showReminder ? Stages.Reminder : Stages.Email,
  )
  const [confirmationCode, setConfirmationCode] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const { isMobile } = useWebMediaQueries()
  const { openModal, closeModal } = useModalControls()

  React.useEffect(() => {
    if (!session) {
      logger.error(`VerifyEmail modal opened without currentAccount`)
      closeModal()
    }
  }, [session, closeModal])

  const onSendEmail = async () => {
    setError('')
    setIsProcessing(true)
    try {
      // await agent.com.atproto.server.requestEmailConfirmation()
      setStage(Stages.ConfirmCode)
    } catch (e) {
      setError(cleanError(String(e)))
    } finally {
      setIsProcessing(false)
    }
  }

  const onConfirm = async () => {
    setError('')
    setIsProcessing(true)
    try {
      // await agent.com.atproto.server.confirmEmail({
      //   email: (currentAccount?.email || '').trim(),
      //   token: confirmationCode.trim(),
      // })
      // await agent.resumeSession(agent.session!)
      Toast.show(`Email verified`)
      closeModal()
      onSuccess?.()
    } catch (e) {
      setError(cleanError(String(e)))
    } finally {
      setIsProcessing(false)
    }
  }

  const onEmailIncorrect = () => {
    closeModal()
    openModal({ name: 'change-email' })
  }

  return (
    <SafeAreaView style={[t.atoms.bg, s.flex1]}>
      <ScrollView
        testID="verifyEmailModal"
        style={[s.flex1, isMobile && { paddingHorizontal: 24 }]}>
        {/* {stage === Stages.Reminder && <ReminderIllustration />} */}
        <View style={styles.titleSection}>
          <Text style={[a.text_xl, styles.title]}>
            {stage === Stages.Reminder
              ? 'Please Verify Your Email'
              : stage === Stages.Email
              ? 'Verify Your Email'
              : stage === Stages.ConfirmCode
              ? 'Enter Confirmation Code'
              : ''}
          </Text>
        </View>

        <Text
          style={[
            a.text_xl,
            t.atoms.text_contrast_medium,
            { marginBottom: 10 },
          ]}>
          {stage === Stages.Reminder
            ? 'Your email has not yet been verified. This is an important security step which we recommend.'
            : stage === Stages.Email
            ? 'This is important in case you ever need to change your email or reset your password.'
            : stage === Stages.ConfirmCode
            ? `An email has been sent to {session?.user?.email || '(no email)'}.
              It includes a confirmation code which you can enter below.`
            : ''}
        </Text>

        {stage === Stages.Email ? (
          <>
            <View style={styles.emailContainer}>
              <FontAwesomeIcon
                icon="envelope"
                color={t.palette.black}
                size={16}
              />
              <Text style={[a.flex_1, { minWidth: 0 }]}>
                {session?.user?.email || `(no email)`}
              </Text>
            </View>
          </>
        ) : stage === Stages.ConfirmCode ? (
          <TextInput
            testID="confirmCodeInput"
            style={[styles.textInput, t.atoms.border_contrast_low]}
            placeholder="XXXXX-XXXXX"
            placeholderTextColor={t.palette.contrast_300}
            value={confirmationCode}
            onChangeText={setConfirmationCode}
            accessible={true}
            accessibilityLabel={`Confirmation code`}
            accessibilityHint=""
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
          />
        ) : undefined}

        {error ? (
          <ErrorMessage message={error} style={styles.error} />
        ) : undefined}

        <View style={[styles.btnContainer]}>
          {isProcessing ? (
            <View style={styles.btn}>
              <ActivityIndicator color="#fff" />
            </View>
          ) : (
            <View style={{ gap: 6 }}>
              {stage === Stages.Reminder && (
                <Button
                  testID="getStartedBtn"
                  variant="solid"
                  color="primary"
                  onPress={() => setStage(Stages.Email)}
                  accessibilityLabel={`Get Started`}
                  accessibilityHint=""
                  label={`Get Started`}>
                  <ButtonText>Get Started</ButtonText>
                </Button>
              )}
              {stage === Stages.Email && (
                <>
                  <Button
                    testID="sendEmailBtn"
                    color="primary"
                    onPress={onSendEmail}
                    accessibilityLabel={`Send Confirmation Email`}
                    accessibilityHint=""
                    label={`Send Confirmation Email`}>
                    <ButtonText>Send Confirmation Email</ButtonText>
                  </Button>
                  <Button
                    testID="haveCodeBtn"
                    variant="solid"
                    color="secondary"
                    accessibilityLabel={`I have a code`}
                    accessibilityHint=""
                    label={`I have a confirmation code`}
                    onPress={() => setStage(Stages.ConfirmCode)}>
                    <ButtonText style={styles.label}>
                      I have a confirmation code
                    </ButtonText>
                  </Button>
                </>
              )}
              {stage === Stages.ConfirmCode && (
                <Button
                  testID="confirmBtn"
                  variant="solid"
                  color="primary"
                  onPress={onConfirm}
                  accessibilityLabel={`Confirm`}
                  accessibilityHint=""
                  label={`Confirm`}>
                  <ButtonText style={styles.label}>Confirm</ButtonText>
                </Button>
              )}
              <Button
                testID="cancelBtn"
                variant="solid"
                color="secondary"
                onPress={() => {
                  closeModal()
                }}
                accessibilityLabel={
                  stage === Stages.Reminder ? `Not right now` : `Cancel`
                }
                accessibilityHint=""
                label={stage === Stages.Reminder ? `Not right now` : `Cancel`}>
                <ButtonText style={styles.label}>
                  {stage === Stages.Reminder ? `Not right now` : `Cancel`}
                </ButtonText>
              </Button>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

// function ReminderIllustration() {

//   return (
//     <View style={[pal.viewLight, { borderRadius: 8, marginBottom: 20 }]}>
//       <Svg viewBox="0 0 112 84" fill="none" height={200}>
//         <Path
//           fillRule="evenodd"
//           clipRule="evenodd"
//           d="M26 26.4264V55C26 60.5229 30.4772 65 36 65H76C81.5228 65 86 60.5229 86 55V27.4214L63.5685 49.8528C59.6633 53.7581 53.3316 53.7581 49.4264 49.8528L26 26.4264Z"
//           fill={palInverted.colors.background}
//         />
//         <Path
//           fillRule="evenodd"
//           clipRule="evenodd"
//           d="M83.666 19.5784C85.47 21.7297 84.4897 24.7895 82.5044 26.7748L60.669 48.6102C58.3259 50.9533 54.5269 50.9533 52.1838 48.6102L29.9502 26.3766C27.8241 24.2505 26.8952 20.8876 29.0597 18.8005C30.8581 17.0665 33.3045 16 36 16H76C79.0782 16 81.8316 17.3908 83.666 19.5784Z"
//           fill={palInverted.colors.background}
//         />
//         <Circle cx="82" cy="61" r="13" fill="#20BC07" />
//         <Path d="M75 61L80 66L89 57" stroke="white" strokeWidth="2" />
//       </Svg>
//     </View>
//   )
// }

const styles = StyleSheet.create({
  titleSection: {
    paddingTop: isWeb ? 0 : 4,
    paddingBottom: isWeb ? 14 : 10,
  },
  title: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 22,
    fontWeight: '500',
  },
  error: {
    borderRadius: 6,
    marginTop: 10,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    marginTop: 10,
  },
  changeEmailLink: {
    marginHorizontal: 12,
    marginBottom: 12,
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
    borderRadius: 32,
    padding: 14,
    backgroundColor: colors.blue3,
  },
  btnContainer: {
    paddingTop: 20,
  },
  label: {
    justifyContent: 'center',
    padding: 4,
  },
})
