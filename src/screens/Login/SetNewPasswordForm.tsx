import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { Text } from '#/components/Typography'
import { useTheme, atoms as a } from '#/theme'
import * as TextField from '#/components/forms/TextField'
import { FormError } from '#/components/forms/FormErrors'
import { At_Stroke2_Corner0_Rounded as At } from '#/components/icons/At'
import { color } from '#/theme/tokens'
import { HStack } from '#/components/HStack'
import { Button } from '#/components/Button'
import { Lock_Stroke2_Corner0_Rounded as Lock } from '#/components/icons/Lock'
import { Ticket_Stroke2_Corner0_Rounded as Ticket } from '#/components/icons/Ticket'
import { supabase } from '#/lib/supabase'
import { logger } from '#/logger'
import * as Toast from '#/view/com/util/Toast'
type SetNewPasswordFormProps = {
  onPressBack: () => void
  email?: string
}

export function SetNewPasswordForm({
  onPressBack,
  email,
}: SetNewPasswordFormProps) {
  const t = useTheme()
  const [confirmationCode, setConfirmationCode] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const onPressNext = async () => {
    if (confirmationCode.length < 6) {
      setError('Invalid Reset Code')
      return
    }
    if (!password) {
      setError('Enter a valid password')
      return
    }
    if (password.length < 7) {
      console.log('password length')
      setError('Password must be atleast 8 characters')
      return
    }
    setError('')
    setIsProcessing(true)
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: 'ryanmercurio30@gmail.com',
        token: confirmationCode.trim(),
        type: 'recovery',
      })
      if (error) {
        throw error
      }
      if (data) {
        await supabase.auth.updateUser({
          password: password,
        })
        Toast.show('Reset Password Successfully.')
      }
    } catch (error) {
      setError('Token has expired or is invalid')
      setIsProcessing(false)
    }
  }
  return (
    <View style={[a.flex_1]}>
      <View style={styles.inner}>
        <Text style={[a.font_bold, a.text_xl]}>Set new password</Text>
        <Text style={[]}>Your verification code is sent to your email.</Text>
        <View style={[styles.formWrapper, a.mt_lg]}>
          <TextField.LabelText style={[a.font_bold, a.text_lg]}>
            Reset code
          </TextField.LabelText>
          <TextField.Root>
            <TextField.Icon icon={Ticket} />
            <TextField.Input
              label="Code"
              placeholder="Enter the 6 digit code"
              style={styles.textInput}
              onChangeText={setConfirmationCode}
              value={confirmationCode}
              maxLength={6}
              keyboardType="number-pad"
            />
          </TextField.Root>
        </View>

        <View style={{ marginTop: 14 }}>
          <TextField.LabelText style={[a.font_bold, a.text_lg]}>
            New password
          </TextField.LabelText>
          <TextField.Root>
            <TextField.Icon icon={Lock} />
            <TextField.Input
              testID="newPasswordInput"
              label={`Enter a password`}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password"
              returnKeyType="done"
              secureTextEntry={true}
              textContentType="password"
              clearButtonMode="while-editing"
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={onPressNext}
              editable={!isProcessing}
              accessibilityHint={`Input new password`}
            />
          </TextField.Root>
        </View>
        <FormError error={error} style={[a.mt_lg]} />
        <HStack style={[a.mt_xl, a.justify_between]}>
          <Button
            label="Back"
            variant="solid"
            color="secondary"
            size="medium"
            onPress={onPressBack}
            style={[a.flex_row]}>
            <Text
              style={[
                { color: color.gray_700, fontSize: 16 },
                a.text_lg,
                a.font_bold,
              ]}>
              Back
            </Text>
          </Button>
          <Button
            label="Next"
            variant="solid"
            color="primary"
            size="medium"
            onPress={onPressNext}
            style={[a.flex_row]}>
            {isProcessing && (
              <ActivityIndicator size={'small'} color={'#fff'} />
            )}
            <Text
              style={[{ color: '#fff', fontSize: 16 }, a.text_lg, a.font_bold]}>
              Next
            </Text>
          </Button>
        </HStack>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inner: {
    marginHorizontal: 24,
  },

  formInput: {
    height: 50,
    width: '100%',
    gap: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  formWrapper: {},
  textInput: {},
})
