import React from 'react'
import type { FC } from 'react'
import { StyleSheet, ViewProps, View, ActivityIndicator } from 'react-native'
import { ModalWithFadeAnimation } from './ModalWithFadeAnimation'

export const FilledSpinner: FC<ViewProps> = props => {
  return (
    <View
      style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
      {...props}>
      <ActivityIndicator size="large" color={'#f3f3f3'} />
    </View>
  )
}

export const WithSpinner: FC<
  { isLoading: boolean; flex: number } & ViewProps
> = ({ children, isLoading, ...restProps }) => {
  return (
    <View
      style={[StyleSheet.absoluteFill, { position: 'relative' }]}
      {...restProps}>
      {children}
      {isLoading && (
        <ModalWithFadeAnimation isVisible={true}>
          <FilledSpinner />
        </ModalWithFadeAnimation>
      )}
    </View>
  )
}
