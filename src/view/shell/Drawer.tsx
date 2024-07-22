import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '#/components/Typography'
import { useTheme, atoms as a } from '#/theme'
type DrawerProps = {}
export function DrawerContent(props: DrawerProps) {
  const t = useTheme()

  return (
    <>
      <View style={[a.flex_1]}>
        <Text>Drawer</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({})
