import React, {useCallback, useState} from 'react'
import {View, StyleSheet} from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {Text} from '#/components/Typography'
import {useTheme, atoms as a} from '#/theme'
import {CommonNavigatorParams} from '#/lib/routes/types'

import {PartsList} from '#/view/com/parts/PartsList'
import {Button} from '#/components/Button'
import {useModalControls} from '#/state/modals'
import {useSession} from '#/state/session'

type Props = NativeStackScreenProps<CommonNavigatorParams, 'Parts'>
export function PartsScreen(props: Props) {
  const t = useTheme()
  const {openModal} = useModalControls()
  const {session} = useSession()

  const onNewParts = useCallback(() => {
    openModal({
      name: 'create-or-edit-part',
      part: {
        name: '',
        brand: null,
        description: null,
        category_id: null,
        part_no: null,
        price: 0,
        store_id: session?.store_id ?? null,
      },
    })
  }, [openModal, session])

  return (
    <View style={[a.flex_1, a.p_lg, t.atoms.bg_contrast_25]}>
      <View
        style={[
          a.flex_row,
          a.justify_between,
          a.align_center,
          a.mt_xs,
          a.mb_sm,
        ]}>
        <Text style={[a.text_xl, a.font_bold]}>Manage Parts</Text>
        <Button
          onPress={onNewParts}
          variant="solid"
          color="primary"
          label={'Add new parts'}
          style={[a.p_2xs, a.rounded_sm]}>
          New Parts
        </Button>
      </View>
      {/* <PartFilter /> */}
      <PartsList />

      {/* <PartFormModal isOpen={isOpen}  /> */}
    </View>
  )
}
