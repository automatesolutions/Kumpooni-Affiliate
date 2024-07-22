import React from 'react'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Text } from '#/components/Typography'
import { useTheme, atoms as a } from '#/theme'
import { StoreProfile } from '#/state/queries/profile'

type BusinessInformationProps = {
  profile: StoreProfile
}

export const snapPoints = ['fullscreen']
export function Component(props: BusinessInformationProps) {
  const t = useTheme()
  return (
    <KeyboardAvoidingView style={[a.flex_1, t.atoms.bg_contrast_25]}>
      <View style={styles.container}>
        <View style={[]}>
          <Text style={[a.text_2xl, a.font_bold]}>Business Information</Text>
        </View>
        <View style={[t.atoms.bg, a.mt_sm, a.py_2xl, a.px_lg, a.rounded_md]}>
          <Text style={[a.text_lg, { fontWeight: '400' }]}>
            Identity card number
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
  },
})
