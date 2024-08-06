import React, {useCallback} from 'react'
import {BackHandler, View} from 'react-native'
import {Outlet as PortalOutlet} from '#/components/Portal'
import {ModalsContainer} from '../com/util/modals/Modal'
import {isAndroid} from 'platform/detection'
import {useCloseAnyActiveElement} from 'state/utils'
import {useNotificationRegistration} from 'lib/notifications/useNotificationRegistration'
import {useNotificationsHandler} from 'lib/hooks/useNotificationHandler'
import {RootNavigator, RoutesContainer} from '#/Navigation'

function ShellInner() {
  const closeAnyActiveElement = useCloseAnyActiveElement()

  useNotificationRegistration()
  useNotificationsHandler()
  React.useEffect(() => {
    let listener = {remove() {}}
    if (isAndroid) {
      console.log('backPress')
      listener = BackHandler.addEventListener('hardwareBackPress', () => {
        return closeAnyActiveElement()
      })
    }
    return () => {
      listener.remove()
    }
  }, [closeAnyActiveElement])
  return (
    <>
      <View style={{height: '100%'}}>
        <RootNavigator />
      </View>
      <ModalsContainer />
      <PortalOutlet />
    </>
  )
}
export function Shell() {
  return (
    <View style={{height: '100%'}}>
      <RoutesContainer>
        <ShellInner />
      </RoutesContainer>
    </View>
  )
}
