import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { Text } from '#/components/Typography'
import { useTheme, atoms as a } from '#/theme'
import { periods } from '#/lib/constants'
import { colors } from '#/lib/styles'
import { StoreStatistic } from './StoreStatistic'
import { useStorePerformance } from '#/modules/appointment'

export function StoreAnayltics({ storeId }: { storeId: string }) {
  const t = useTheme()
  const [period, setPeriod] = useState('today')
  const {
    data: storePerformance,
    isLoading: storeLoading,
    isSuccess,
  } = useStorePerformance(storeId!, period)
  if (storeLoading) {
    return <ActivityIndicator />
  }
  return (
    <>
      <View style={[a.px_lg, a.self_end, a.flex_row, a.gap_2xs]}>
        {periods.map(({ label, value }) => {
          const isActive = period === value
          return (
            <TouchableOpacity
              key={value}
              onPress={() => setPeriod(value)}
              style={[
                a.px_2xs,
                a.py_3xs,
                a.border,
                {
                  borderRadius: 5,
                  borderColor: isActive ? '#b61616' : colors.gray4,
                },
              ]}>
              <Text style={[, { color: isActive ? '#b61616' : colors.gray5 }]}>
                {label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
      {isSuccess ? (
        <StoreStatistic storePerformance={storePerformance} />
      ) : null}
    </>
  )
}

const styles = StyleSheet.create({})
