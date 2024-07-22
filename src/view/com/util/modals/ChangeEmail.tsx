import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '#/components/Typography'
import { useTheme, atoms as a } from '#/theme'

type ChangeEmailProps = {
  name?: string
}

export const snapPoints = ['90%']
export function Component(props: ChangeEmailProps) {
  const t = useTheme()
  return (
    <View>
      <Text>Componentt</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
