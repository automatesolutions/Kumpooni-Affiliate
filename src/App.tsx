import 'react-native-url-polyfill/auto'
import 'view/icons'
import React, {useState} from 'react'
import {RootSiblingParent} from 'react-native-root-siblings'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {ThemeProvider} from '#/theme'

import {Shell} from './view/shell'
import {useColorModeTheme} from './theme/util/useColorModeTheme'
import {init as initPersistedState} from 'state/persisted'
import {Provider as SessionStateProvider, useSession} from 'state/session'
import {Provider as PortalProvider} from '#/components/Portal'
import {Provider as ShellStateProvider} from 'state/shell'
import {Provider as DialogStateProvider} from 'state/dialogs'
import {Provider as LoggedOutViewProvider} from 'state/shell/logged-out'
import {Provider as ModalStateProvider} from 'state/modals'
import {Provider as UnreadNotifsProvider} from 'state/queries/notifications/unread'
import {PaperProvider} from 'react-native-paper'
import {MenuProvider} from 'react-native-popup-menu'
import {QueryProvider} from 'lib/react-query'
import messaging from '@react-native-firebase/messaging'
import * as notification from 'lib/notifications'

function InnerApp() {
  const theme = useColorModeTheme()
  const {session} = useSession()

  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      await notification.onDisplayNotification(remoteMessage)
    })
    return unsubscribe
  }, [])
  return (
    <SafeAreaProvider>
      <LoggedOutViewProvider>
        <ThemeProvider theme={theme}>
          <RootSiblingParent>
            <QueryProvider sessionId={session?.user.id}>
              <UnreadNotifsProvider>
                <GestureHandlerRootView>
                  <PaperProvider>
                    <MenuProvider>
                      <Shell />
                    </MenuProvider>
                  </PaperProvider>
                </GestureHandlerRootView>
              </UnreadNotifsProvider>
            </QueryProvider>
          </RootSiblingParent>
        </ThemeProvider>
      </LoggedOutViewProvider>
    </SafeAreaProvider>
  )
}
function App() {
  const [isReady, setReady] = useState(false)

  React.useEffect(() => {
    Promise.all([initPersistedState()]).then(() => setReady(true))
  }, [])

  if (!isReady) {
    return null
  }
  return (
    <SessionStateProvider>
      <ShellStateProvider>
        {/* <RealTimeDataProvider> */}
        <ModalStateProvider>
          <DialogStateProvider>
            <PortalProvider>
              <InnerApp />
            </PortalProvider>
          </DialogStateProvider>
        </ModalStateProvider>
        {/* </RealTimeDataProvider> */}
      </ShellStateProvider>
    </SessionStateProvider>
  )
}

export default App
