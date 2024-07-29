import React from 'react'
import {
  CommonActions,
  createNavigationContainerRef,
  LinkingOptions,
  NavigationContainer,
  StackActions,
} from '@react-navigation/native'
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import {HomeScreen} from './screens/Home'

import {createNativeStackNavigatorWithAuth} from './view/shell/createNativeStackWithAuth'
import {
  AllNavigatorParams,
  OrdersTabNavigatorParams,
  BottomTabNavigatorParams,
  ServicesTabNavigatorParams,
  PartsTabNavigatorParams,
  State,
  RouteParams,
  SettingsTabNavigatorParams,
} from './lib/routes/types'
import {BottomBar} from './view/shell/BottomBar'
import {OrdersScreen} from './screens/Orders'
import {ServicesScreen} from './screens/Services'
import {SettingsScreen} from './screens/Settings'
import {OrderDetailsScreen} from './screens/OrderDetails'
import {Storybook} from './screens/StoryBook'
import {PartsScreen} from './screens/Parts'
import {CreateServiceScreen} from './screens/CreateService'
import {HolidayModeScreen} from './screens/HolidayMode'
import {AccountSettingScreen} from './screens/AccountSetting'
import {NotificationScreen} from './screens/Notification'
import {router} from './routes'
import {isNative} from './platform/detection'
import {buildStateObject} from './lib/routes/helpers'
import {timeout} from './lib/async/timeout'

const RootStack = createNativeStackNavigatorWithAuth<AllNavigatorParams>()
const Tab = createBottomTabNavigator<BottomTabNavigatorParams>()
const HomeTab = createNativeStackNavigatorWithAuth()
const OrdersTab = createNativeStackNavigatorWithAuth<OrdersTabNavigatorParams>()
const ServicesTab =
  createNativeStackNavigatorWithAuth<ServicesTabNavigatorParams>()
const PartsTab = createNativeStackNavigatorWithAuth<PartsTabNavigatorParams>()
const SettingsTab =
  createNativeStackNavigatorWithAuth<SettingsTabNavigatorParams>()

const navigationRef = createNavigationContainerRef<AllNavigatorParams>()
function TabsNavigator() {
  const tabBar = React.useCallback(
    (props: JSX.IntrinsicAttributes & BottomTabBarProps) => (
      <BottomBar {...props} />
    ),
    [],
  )
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      screenOptions={{headerShown: false, lazy: true}}
      initialRouteName="HomeTab"
      tabBar={tabBar}>
      <Tab.Screen name="HomeTab" getComponent={() => HomeTabNavigator} />
      <Tab.Screen name="OrdersTab" getComponent={() => OrdersTabNavigator} />
      <Tab.Screen
        name="ServicesTab"
        getComponent={() => ServicesTabNavigator}
      />
      <Tab.Screen name="PartsTab" getComponent={() => PartsTabNavigator} />
      <Tab.Screen
        name="SettingsTab"
        getComponent={() => SettingsTabNavigator}
      />
    </Tab.Navigator>
  )
}
function RootNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="RootTab">
      <RootStack.Screen name="RootTab" getComponent={() => TabsNavigator} />
      <RootStack.Screen
        name="OrderDetails"
        getComponent={() => OrderDetailsScreen}
      />
      <RootStack.Screen
        name="Debug"
        getComponent={() => Storybook}
        options={{title: 'Hello World', requireAuth: true}}
      />
      <RootStack.Screen
        name="CreateOrEditService"
        getComponent={() => CreateServiceScreen}
      />
      <RootStack.Screen
        name="HolidayMode"
        options={{
          headerShown: true,
          title: 'Holiday Mode',
        }}
        getComponent={() => HolidayModeScreen}
      />

      <RootStack.Screen
        name="AccountSetting"
        getComponent={() => AccountSettingScreen}
      />
      <RootStack.Screen
        name="Notification"
        getComponent={() => NotificationScreen}
      />
    </RootStack.Navigator>
  )
}

function HomeTabNavigator() {
  return (
    <HomeTab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeTab.Screen
        name="Home"
        getComponent={() => HomeScreen}
        options={{requireAuth: true}}
      />
    </HomeTab.Navigator>
  )
}
function OrdersTabNavigator() {
  return (
    <OrdersTab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <OrdersTab.Screen
        name="Order"
        getComponent={() => OrdersScreen}
        options={{requireAuth: true}}
      />
    </OrdersTab.Navigator>
  )
}
function ServicesTabNavigator() {
  return (
    <ServicesTab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ServicesTab.Screen
        name="Service"
        getComponent={() => ServicesScreen}
        options={{requireAuth: true}}
      />
    </ServicesTab.Navigator>
  )
}
function PartsTabNavigator() {
  return (
    <PartsTab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <PartsTab.Screen
        name="Parts"
        getComponent={() => PartsScreen}
        options={{requireAuth: true}}
      />
    </PartsTab.Navigator>
  )
}
function SettingsTabNavigator() {
  return (
    <SettingsTab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SettingsTab.Screen
        name="Settings"
        getComponent={() => SettingsScreen}
        options={{requireAuth: true}}
      />
    </SettingsTab.Navigator>
  )
}

const LINKING: LinkingOptions<AllNavigatorParams> = {
  prefixes: ['kumpoonipartner://'],
  getPathFromState(state: State) {
    // find the current node in the navigation tree
    let node = state.routes[state.index || 0]
    while (node.state?.routes && typeof node.state?.index === 'number') {
      node = node.state?.routes[node.state?.index]
    }

    // build the path
    const route = router.matchName(node.name)
    if (typeof route === 'undefined') {
      return '/' // default to home
    }
    return route.build((node.params || {}) as RouteParams)
  },
  getStateFromPath(path: string) {
    const [name, params] = router.matchPath(path)
    // Any time we receive a url that starts with `intent/` we want to ignore it here. It will be handled in the
    // intent handler hook. We should check for the trailing slash, because if there isn't one then it isn't a valid
    // intent
    // On web, there is no route state that's created by default, so we should initialize it as the home route. On
    // native, since the home tab and the home screen are defined as initial routes, we don't need to return a state
    // since it will be created by react-navigation.
    if (path.includes('intent/')) {
      if (isNative) return
      return buildStateObject('Flat', 'Home', params)
    }

    if (isNative) {
      if (name === 'Home') {
        return buildStateObject('HomeTab', 'Home', params)
      }
      if (name === 'Orders' || name === 'Order') {
        return buildStateObject('OrdersTab', 'Order', params)
      }
      if (name === 'Services') {
        return buildStateObject('ServicesTab', 'Services', params)
      }
      if (name === 'Parts') {
        return buildStateObject('PartsTab', 'Parts', params)
      }
      // if the path is something else, like a post, profile, or even settings, we need to initialize the home tab as pre-existing state otherwise the back button will not work
      return buildStateObject('MyProfileTab', name, params, [
        {
          name: 'Home',
          params: {},
        },
      ])
    } else {
      const res = buildStateObject('Flat', name, params)
      return res
    }
  },
}
function RoutesContainer({children}: React.PropsWithChildren<{}>) {
  return (
    <NavigationContainer ref={navigationRef} linking={LINKING}>
      {children}
    </NavigationContainer>
  )
}

function getCurrentRouteName() {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute()?.name
  } else {
    return undefined
  }
}

/**
 * These helpers can be used from outside of the RoutesContainer
 * (eg in the state models).
 */

function navigate<K extends keyof AllNavigatorParams>(
  name: K,
  params?: AllNavigatorParams[K],
) {
  if (navigationRef.isReady()) {
    return Promise.race([
      new Promise<void>(resolve => {
        const handler = () => {
          resolve()
          navigationRef.removeListener('state', handler)
        }
        navigationRef.addListener('state', handler)

        // @ts-ignore I dont know what would make typescript happy but I have a life -prf
        navigationRef.navigate(name, params)
      }),
      timeout(1e3),
    ])
  }
  return Promise.resolve()
}

function resetToTab(
  tabName:
    | 'HomeTab'
    | 'OrdersTab'
    | 'ServicesTab'
    | 'SettingsTab'
    | 'RootTab'
    | 'PartsTab',
) {
  if (navigationRef.isReady()) {
    navigate(tabName)
    if (navigationRef.canGoBack()) {
      navigationRef.dispatch(StackActions.popToTop()) //we need to check .canGoBack() before calling it
    }
  }
}

// returns a promise that resolves after the state reset is complete
function reset(): Promise<void> {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: isNative ? 'HomeTab' : 'Home'}],
      }),
    )
    return Promise.race([
      timeout(1e3),
      new Promise<void>(resolve => {
        const handler = () => {
          resolve()
          navigationRef.removeListener('state', handler)
        }
        navigationRef.addListener('state', handler)
      }),
    ])
  } else {
    return Promise.resolve()
  }
}

function handleLink(url: string) {
  let path
  if (url.startsWith('/')) {
    path = url
  } else if (url.startsWith('http')) {
    try {
      path = new URL(url).pathname
    } catch (e) {
      console.error('Invalid url', url, e)
      return
    }
  } else {
    console.error('Invalid url', url)
    return
  }

  const [name, params] = router.matchPath(path)
  if (isNative) {
    if (name === 'Home') {
      resetToTab('HomeTab')
    } else if (name === 'Services') {
      resetToTab('ServicesTab')
    } else if (name === 'Orders') {
      resetToTab('OrdersTab')
    } else if (name === 'Parts') {
      resetToTab('PartsTab')
    } else {
      resetToTab('HomeTab')
      // @ts-ignore matchPath doesnt give us type-checked output -prf
      navigate(name, params)
    }
  } else {
    // @ts-ignore matchPath doesnt give us type-checked output -prf
    navigate(name, params)
  }
}
export {
  RoutesContainer,
  TabsNavigator,
  RootNavigator,
  navigate,
  reset,
  resetToTab,
  handleLink,
  getCurrentRouteName,
}
