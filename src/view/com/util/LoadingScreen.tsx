import React from 'react'
import { ActivityIndicator, View } from 'react-native'

import { CenteredView } from './Views'
import { atoms as a } from '#/theme'

export function LoadingScreen() {
  return (
    <CenteredView>
      <View style={[a.pt_xl]}>
        <ActivityIndicator size="large" />
      </View>
    </CenteredView>
  )
}
