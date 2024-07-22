import React from 'react'
import { ActivityIndicator, View } from 'react-native'

import { atoms as a } from '#/theme'
import { CenteredView } from '#/view/com/util/Views'
export function LoadingScreen() {
  return (
    <CenteredView>
      <View style={[a.p_2xl]}>
        <ActivityIndicator size="large" />
      </View>
    </CenteredView>
  )
}
