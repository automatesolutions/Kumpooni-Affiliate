import { Text } from '#/components/Typography'
import { color } from '#/theme/tokens'
import { Ellipsis } from 'lucide-react-native'
import { Alert, View } from 'react-native'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'
import { atoms as a } from '#/theme'
import * as Prompt from '#/components/Prompt'
import { DeletePartPrompt } from './DeletePartPrompt'
import { useCallback } from 'react'
export function PartsMenu({
  onEdit,
  partId,
}: {
  partId: number
  onEdit: () => void
}) {
  const deleteControlPrompt = Prompt.usePromptControl()
  const onDelete = useCallback(() => {
    deleteControlPrompt.open()
  }, [deleteControlPrompt])
  return (
    <>
      <Menu>
        <MenuTrigger>
          <Ellipsis size={20} color={color.gray_300} />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsWrapper: {},
            optionsContainer: {
              marginTop: 20,
            },
          }}>
          <MenuOption onSelect={onEdit}>
            <View style={[a.px_2xs, a.py_2xs]}>
              <Text style={{}}>Edit</Text>
            </View>
          </MenuOption>

          <MenuOption onSelect={onDelete}>
            <View style={[a.px_2xs, a.py_2xs]}>
              <Text style={{}}>Delete</Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
      <DeletePartPrompt control={deleteControlPrompt} partId={partId} />
    </>
  )
}
