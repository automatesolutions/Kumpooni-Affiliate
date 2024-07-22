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
import { atoms as a, useTheme } from '#/theme'
import { ServiceStatus } from '#/modules/services/types'
import * as Prompt from '#/components/Prompt'
export function ServicesMenu({
  onEdit,
  onDelete,
  onToggleActiveInactive,
  status,
}: {
  status?: ServiceStatus
  onEdit: () => void
  onDelete: () => void
  onToggleActiveInactive?: () => void
}) {
  const t = useTheme()
  return (
    <>
      <Menu>
        <MenuTrigger>
          <Ellipsis size={24} color={color.trueBlack} />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsWrapper: {},
            optionsContainer: {
              marginTop: 20,
            },
          }}>
          <MenuOption
            onSelect={onEdit}
            style={[a.border_b, t.atoms.border_contrast_low]}>
            <View style={[a.px_2xs, a.py_2xs]}>
              <Text style={[a.font_semibold]}>Edit</Text>
            </View>
          </MenuOption>
          {status && status !== 'Draft' ? (
            <MenuOption
              onSelect={onToggleActiveInactive}
              style={[a.border_b, t.atoms.border_contrast_low]}>
              <View style={[a.px_2xs, a.py_2xs]}>
                <Text style={[a.font_semibold]}>
                  {status === 'Inactive' ? 'Activate' : 'Deactivate'}
                </Text>
              </View>
            </MenuOption>
          ) : null}

          <MenuOption
            onSelect={onDelete}
            style={[a.border_b, t.atoms.border_contrast_low]}>
            <View style={[a.px_2xs, a.py_2xs]}>
              <Text style={[a.font_semibold]}>Delete</Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </>
  )
}
