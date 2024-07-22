import React from 'react'

import { useNavigation } from '@react-navigation/native'

import { DialogOuterProps } from '#/components/Dialog'
import * as Prompt from '#/components/Prompt'
import { NavigationProp } from '#/lib/routes/types'
import { useDeletePart } from '#/state/queries/parts'

export function DeletePartPrompt({
  control,
  partId,
}: {
  control: DialogOuterProps['control']
  partId: number
}) {
  const navigation = useNavigation<NavigationProp>()

  const { mutate: deletePart } = useDeletePart(partId)

  return (
    <Prompt.Basic
      control={control}
      title={`Delete Part?`}
      description={`Are you sure you'd like to delete this Part?`}
      onConfirm={deletePart}
      confirmButtonCta={`Delete`}
      confirmButtonColor="negative"
    />
  )
}
