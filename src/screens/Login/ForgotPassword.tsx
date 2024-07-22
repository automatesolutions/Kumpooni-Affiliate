import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native'
import { Text } from '#/components/Typography'
import { useTheme, atoms as a } from '#/theme'
import { HStack } from '#/components/HStack'
import * as EmailValidator from 'email-validator'

import { color } from '#/theme/tokens'
import * as TextField from '#/components/forms/TextField'
import { Globe_Stroke2_Corner0_Rounded as Globe } from '#/components/icons/Globe'
import { At_Stroke2_Corner0_Rounded as At } from '#/components/icons/At'
import { FormError } from '#/components/forms/FormErrors'
import { supabase } from '#/lib/supabase'
import { Button } from '#/components/Button'
type ForgotPasswordProps = {
  onPressBack: () => void
  onEmailSent: () => void
}

export function ForgotPassword({
  onPressBack,
  onEmailSent,
}: ForgotPasswordProps) {
  const t = useTheme()
  const [email, setEmail] = useState('')
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const onResetPassword = async () => {
    if (!EmailValidator.validate(email)) {
      return setError(`Your email appears to be invalid.`)
    }

    setError('')
    setIsProcessing(true)
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email)
      console.log('data', data)
      if (error) {
        console.error('error', error)
        throw error
      }
      onEmailSent()
    } catch (error) {
      setError('Failed to reset password')
    } finally {
      setIsProcessing(false)
    }
  }
  return (
    <View style={[a.flex_1]}>
      <View style={styles.inner}>
        <Text style={[a.font_bold, a.text_lg]}>Reset Password</Text>
        <Text style={[]}>
          Please enter the email that you want to reset the password.
        </Text>
        <View style={[styles.formWrapper, a.mt_lg, a.gap_xs]}>
          <Text style={[]}>Email</Text>
          <TextField.Root>
            <TextField.Icon icon={At} />
            <TextField.Input
              label="Email"
              placeholder="Enter your email address"
              style={styles.textInput}
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
            />
          </TextField.Root>
          <FormError error={error} />
        </View>
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
            onPress={onResetPassword}
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
    marginTop: 14,
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
