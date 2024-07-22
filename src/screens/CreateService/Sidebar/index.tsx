import React, { useCallback, useMemo } from 'react'
import { View, StyleSheet, Keyboard, KeyboardAvoidingView } from 'react-native'
import { Text } from '#/components/Typography'
import { useTheme, atoms as a } from '#/theme'
import { Drawer } from 'react-native-drawer-layout'
import { useSidebarControls, useSidebarState } from '#/state/shell/sidebar'

import { RepairOrderLineForm, RepairOrderLinePartForm } from '#/modules/orders'
import ServiceLinePartForm from '../ServiceLinePartForm'
import { usePartsQuery } from '#/modules/shared'
import { useSession } from '#/state/session'
import { Parts } from '#/modules/shared/types'

export function ServiceSidebar({ children }: React.PropsWithChildren<{}>) {
  const t = useTheme()

  const state = useSidebarState()
  const { session } = useSession()
  const { data, isLoading } = usePartsQuery(session?.store_id)
  const { closeSidebar, openSidebar } = useSidebarControls()
  const onOpenSidebar = React.useCallback(() => console.log('open SideBar'), [])

  const onCloseSidebar = React.useCallback(() => {
    if (Keyboard) {
      Keyboard.dismiss()
    }
    closeSidebar()
  }, [closeSidebar])

  const renderDrawerContent = useCallback(() => {
    return data ? <SideBarInner partList={data} /> : null
  }, [data])
  // console.log('rerender Sidebar')
  return (
    <Drawer
      key={'ServiceSidebar'}
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

function SideBarInner({ partList }: { partList: Parts[] }) {
  const state = useSidebarState()

  const options = useMemo(() => {
    if (!partList) return []
    return partList.map(part => ({ value: part, label: part.name }))
  }, [partList])

  // console.log('o', upsertService)

  // if (!state?.orderLineService) {
  //   return <View />
  // }
  return (
    <KeyboardAvoidingView style={[{ height: '100%' }]}>
      <View style={[a.flex_1]}>
        <View style={[a.px_2xl, a.py_lg, a.border_b]}>
          <Text style={[a.font_bold, a.text_lg]}>{`${
            state?.serviceLinePart?.id ? 'Edit Part' : 'Add Part'
          }`}</Text>
        </View>

        {state?.serviceLinePart ? (
          <ServiceLinePartForm
            initialValues={state.serviceLinePart}
            options={options}
          />
        ) : null}
      </View>
    </KeyboardAvoidingView>
  )
}

// function ServiceLineInner() {
//   return (

//   )
// }

const styles = StyleSheet.create({})
