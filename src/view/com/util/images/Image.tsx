import React from 'react'
import { Image, ImageProps, ImageSourcePropType } from 'react-native'

interface HighPriorityImageProps extends ImageProps {
  source: ImageSourcePropType
}
export function HighPriorityImage({
  source,
  ...props
}: HighPriorityImageProps) {
  const updatedSource = {
    uri: typeof source === 'object' && source ? source?.uri : '',
  } satisfies ImageSourcePropType
  return (
    <Image accessibilityIgnoresInvertColors source={updatedSource} {...props} />
  )
}
