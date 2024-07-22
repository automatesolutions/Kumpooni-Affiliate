import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '#/components/Typography'
import { useTheme, atoms as a } from '#/theme'
type DropdownMenuProps = {}
export function DropdownMenu(props: DropdownMenuProps) {
  const t = useTheme()
  return (
    <View>
      <Text>DropdownMenu</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
