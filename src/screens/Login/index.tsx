import React, { useCallback, useState } from 'react'
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native'
import { z } from 'zod'
import { Text } from '#/components/Typography'
import { useTheme, atoms as a } from '#/theme'
import { useSessionApi } from '#/state/session'

import { HStack } from '#/components/HStack'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { authSchema } from '#/modules/auth'
import * as Toast from '#/view/com/util/Toast'
import { cleanError } from '#/lib/strings/errors'
import { useDialogControl } from '#/components/Dialog'
import { LoggedOutLayout } from './LoggedOutLayout'
import { ForgotPassword } from './ForgotPassword'
import { LoginForm } from './LoginForm'
import { SetNewPasswordForm } from './SetNewPasswordForm'

enum Forms {
  Login,
  ForgotPassword,
  SetNewPassword,
}

export function Login() {
  const t = useTheme()
  const [currentForm, setCurrentForm] = useState(Forms.Login)
  const [error, setError] = useState('')
  const onPressForgotPassword = () => {
    setCurrentForm(Forms.ForgotPassword)
  }

  const gotoForm = (form: Forms) => {
    setError('')
    setCurrentForm(form)
  }

  let content = null
  let title = ''
  let description = ''
  switch (currentForm) {
    case Forms.Login: {
      title = 'Sign In'
      description = 'Login with password'
      content = <LoginForm onPressForgotPassword={onPressForgotPassword} />
      break
    }
    case Forms.ForgotPassword: {
      title = 'Forgot Password'
      description =
        'Please enter the account that you want to reset the password'
      content = (
        <ForgotPassword
          onPressBack={() => gotoForm(Forms.Login)}
          onEmailSent={() => gotoForm(Forms.SetNewPassword)}
        />
      )
      break
    }

    case Forms.SetNewPassword: {
      content = (
        <SetNewPasswordForm
          onPressBack={() => gotoForm(Forms.ForgotPassword)}
        />
      )
      break
    }
  }
  return (
    <View style={[a.flex_1, t.atoms.bg_contrast_25]}>
      <LoggedOutLayout>{content}</LoggedOutLayout>
    </View>
  )
}
