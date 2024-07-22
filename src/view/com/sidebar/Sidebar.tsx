import React from 'react'
import { View, StyleSheet, Keyboard, KeyboardAvoidingView } from 'react-native'
import { Text } from '#/components/Typography'
import { useTheme, atoms as a } from '#/theme'
import { Drawer } from 'react-native-drawer-layout'
import { useSidebarControls, useSidebarState } from '#/state/shell/sidebar'

import { RepairOrderLineForm, RepairOrderLinePartForm } from '#/modules/orders'

export function Sidebar({ children }: React.PropsWithChildren<{}>) {
  const t = useTheme()

  const state = useSidebarState()

  const { closeSidebar, openSidebar } = useSidebarControls()
  const onOpenSidebar = React.useCallback(() => console.log('open SideBar'), [])

  const onCloseSidebar = React.useCallback(() => {
    if (Keyboard) {
      Keyboard.dismiss()
    }
    closeSidebar()
  }, [closeSidebar])

  const renderDrawerContent = () => {
    return <SideBarInner />
  }
  // console.log('rerender Sidebar')
  return (
    <Drawer
      key={'SidebarDrawer'}
      open={state?.showSidebar ?? false}
      onOpen={onOpenSidebar}
      onClose={onCloseSidebar}
      drawerType={'front'}
      drawerPosition="right"
      drawerStyle={{
        width: '40%',
      }}
      renderDrawerContent={renderDrawerContent}
      style={[]}>
      {children}
    </Drawer>
  )
}

function SideBarInner() {
  const state = useSidebarState()

  const isService = !!state?.orderLineService
  const isEdit = isService
    ? !!state.orderLineService?.id
    : !!state?.orderLinePart?.id
  // console.log('o', upsertService)

  // if (!state?.orderLineService) {
  //   return <View />
  // }
  return (
    <KeyboardAvoidingView style={[{ height: '100%' }]}>
      <View style={[a.flex_1]}>
        <View style={[a.px_2xl, a.py_lg, a.border_b]}>
          <Text style={[a.font_bold, a.text_lg]}>{`${isEdit ? 'Edit' : 'Add'} ${
            isService ? 'Service' : 'Part'
          }`}</Text>
        </View>
        {state?.orderLineService ? (
          <RepairOrderLineForm initialValues={state.orderLineService} />
        ) : null}
        {state?.orderLinePart ? (
          <RepairOrderLinePartForm initialValues={state.orderLinePart} />
        ) : null}
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({})
