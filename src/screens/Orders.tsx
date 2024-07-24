import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Text} from '#/components/Typography'
import {useTheme, atoms as a} from '#/theme'

type OrdersProps = {}

export function OrdersScreen(props: OrdersProps) {
  const t = useTheme()
  return <View style={[a.flex_1, t.atoms.bg]}></View>
}

const styles = StyleSheet.create({})
