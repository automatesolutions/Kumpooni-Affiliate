import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native'
import {useTheme, atoms as a} from '#/theme'

import {color} from '#/theme/tokens'

import React from 'react'
import {Logotype} from '#/view/icons/LogoType'
export function LoggedOutLayout({children}: React.PropsWithChildren) {
  const t = useTheme()
  const {width, height} = useWindowDimensions()
  return (
    <ScrollView
      style={styles.scrollview}
      contentContainerStyle={[
        {
          width: width * 0.47,
          height: height * 0.8,
          backgroundColor: '#fff',
          borderRadius: 10,
          alignSelf: 'center',
          paddingVertical: 12,
        },
      ]}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag">
      <View style={[{marginHorizontal: 24, marginBottom: 14}]}>
        <Logotype fill={'#E50914'} width={250} />
      </View>
      {children}
    </ScrollView>
  )
}

// <ScrollView
//   contentContainerStyle={[
//     {
//       width: width * 0.4,
//       height: height * 0.8,
//       backgroundColor: '#fff',
//       borderWidth: 1,
//       borderColor: color.gray_200,
//       alignItems: 'center',
//       borderRadius: 10,
//     },
//   ]}></ScrollView>
export const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
    marginTop: 40,
  },
  contentScrollView: {
    flex: 1,

    borderWidth: 1,
    borderColor: color.gray_200,
    borderRadius: 10,
  },
})
