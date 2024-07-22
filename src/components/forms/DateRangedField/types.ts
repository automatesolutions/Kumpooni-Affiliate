export type DateFieldProps = {
  value: string | null
  onChangeDate: (date: string) => void
  label: string
  isInvalid?: boolean
  testID?: string
  accessibilityHint?: string
}
