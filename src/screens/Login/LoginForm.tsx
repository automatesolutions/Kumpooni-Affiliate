import {authSchema} from '#/modules/auth'
import {useSessionApi} from '#/state/session'
import {zodResolver} from '@hookform/resolvers/zod'
import {useCallback, useRef, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {z} from 'zod'
import * as Toast from '#/view/com/util/Toast'
import {useDialogControl} from '#/components/Dialog'
import {cleanError} from '#/lib/strings/errors'
import {
  ActivityIndicator,
  Image,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {Text} from '#/components/Typography'
import {HStack} from '#/components/HStack'
import {atoms as a} from '#/theme'
import * as TextField from '#/components/forms/TextField'
import {At_Stroke2_Corner0_Rounded as At} from '#/components/icons/At'
import {Lock_Stroke2_Corner0_Rounded as Lock} from '#/components/icons/Lock'
import {Button, ButtonText} from '#/components/Button'
import {color} from '#/theme/tokens'
import {FormError} from '#/components/forms/FormErrors'
type Inputs = z.infer<typeof authSchema>

export function LoginForm({
  onPressForgotPassword,
}: {
  onPressForgotPassword: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const {loginWithEmail} = useSessionApi()

  const passwordInputRef = useRef<TextInput>(null)
  const forgetControl = useDialogControl()
  const {control, watch, handleSubmit} = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: 'ryanmercurio30@gmail.com',
      password: '09192018504',
    },
  })

  const onSubmit = async (data: Inputs) => {
    setLoading(true)
    try {
      await loginWithEmail(data.email, data.password)
    } catch (e: any) {
      setError(e.message)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const onPressForgot = useCallback(() => {
    onPressForgotPassword()
  }, [onPressForgotPassword])

  return (
    <View style={[a.flex_1]}>
      <Controller
        control={control}
        name={'email'}
        render={({
          field: {value, onChange, onBlur},
          fieldState: {error, invalid},
        }) => (
          <View style={styles.formWrapper}>
            <TextField.LabelText style={[a.text_lg]}>Email</TextField.LabelText>
            <TextField.Root>
              <TextField.Icon icon={At} />
              <TextField.Input
                label="Email Address"
                onChangeText={str => onChange((str || '').toLowerCase().trim())}
                onBlur={onBlur}
                defaultValue={value}
                autoCorrect={false}
                autoCapitalize="none"
                autoComplete="email"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus()
                }}
                editable={!loading}
              />
            </TextField.Root>
          </View>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({field: {value, onChange, onBlur}}) => (
          <View style={[styles.formWrapper, a.mt_md]}>
            <TextField.LabelText style={[a.text_lg]}>
              Password
            </TextField.LabelText>
            <TextField.Root>
              <TextField.Icon icon={Lock} />
              <TextField.Input
                inputRef={passwordInputRef}
                label="Password"
                onChangeText={onChange}
                onBlur={onBlur}
                onFocus={() => setError('')}
                defaultValue={value}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="password"
                textContentType="password"
                secureTextEntry
                editable={!loading}
                accessibilityHint={`Input the password you used at signup`}
              />
            </TextField.Root>
          </View>
        )}
      />
      <FormError
        error={error}
        style={[{marginTop: 20, marginHorizontal: 24}]}
      />

      <Button
        label={'Login'}
        variant="solid"
        color="primary"
        size="medium"
        onPress={handleSubmit(onSubmit)}
        style={[
          a.flex_row,
          {
            marginTop: 24,
            marginHorizontal: 24,
          },
        ]}>
        {loading && <ActivityIndicator size={'small'} color={'#fff'} />}
        <ButtonText style={[{color: '#fff'}, a.text_xl, a.font_bold]}>
          Login
        </ButtonText>
      </Button>
      <TouchableOpacity
        style={[a.my_lg, a.self_end, {marginHorizontal: 24}]}
        onPress={onPressForgot}>
        <Text>Forgot Password</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  formInput: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  formWrapper: {
    marginHorizontal: 24,
  },
  textInput: {},
})
