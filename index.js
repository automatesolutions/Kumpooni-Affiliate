/**
 * @format
 */

import {AppRegistry} from 'react-native'
import App from './src/App'
import {name as appName} from './app.json'
import messaging from '@react-native-firebase/messaging'
import notifee from '@notifee/react-native'
import * as notification from 'lib/notifications'

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log({remoteMessage})
  await notification.onDisplayNotification(remoteMessage.notification)
})

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail

  console.log({notification})
  console.log({pressAction})
})
AppRegistry.registerComponent(appName, () => App)
