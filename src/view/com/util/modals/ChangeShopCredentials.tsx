import React from 'react'
import { useModalControls } from '#/state/modals'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export const snapPoints = ['100%']

export function Component({}: {}) {
  const { closeModal } = useModalControls()
  const onCancel = () => {
    closeModal()
  }
  return (
    <View style={{ backgroundColor: '#fff' }}>
      <Text style={{ color: '#000', fontSize: 24, fontWeight: '700' }}>
        Hello World
      </Text>
      <TouchableOpacity
        style={[styles.btn, { marginTop: 10 }]}
        onPress={onCancel}
        accessibilityRole="button"
        accessibilityLabel="Cancel"
        onAccessibilityEscape={onCancel}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    padding: 14,
    marginHorizontal: 20,
  },
})
