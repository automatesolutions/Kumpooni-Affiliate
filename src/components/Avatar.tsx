import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '#/components/Typography'
import { useTheme, atoms as a } from '#/theme'

type AvatarProps = {}
export function Avatar(props: AvatarProps) {
  const t = useTheme()
  return (
    <View style={[a.flex_1]}>
      <Text>Avatar</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
