import {Services} from '#/modules/shared/types'
import {NavigationState, PartialState} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

export type CommonNavigatorParams = {
  OrderDetails: {id: string}
  CreateOrEditService: {id?: number}
  EditServiceScreen: {id: number}
  Debug: undefined
  HolidayMode: undefined
  AccountSetting: undefined
  ForgotPassword: undefined
  Notification: undefined
  Parts: undefined
}

export type BottomTabNavigatorParams = {
  HomeTab: undefined
  OrdersTab: undefined
  ServicesTab: undefined
  PartsTab: undefined
  SettingsTab: undefined
}
export type OrdersTabNavigatorParams = {
  Order: undefined
}
export type ServicesTabNavigatorParams = {
  Service: undefined
}
export type PartsTabNavigatorParams = {
  Parts: undefined
}
export type SettingsTabNavigatorParams = {
  Settings: undefined
}
export type AllNavigatorParams = CommonNavigatorParams & {
  HomeTab: undefined
  Home: undefined
  OrdersTab: undefined
  Order: undefined
  ServicesTab: undefined
  Service: undefined
  PartsTab: undefined
  Parts: undefined
  SettingsTab: undefined
  Settings: undefined
  RootTab: undefined
}

export type NavigationProp = NativeStackNavigationProp<AllNavigatorParams>

export type State =
  | NavigationState
  | Omit<PartialState<NavigationState>, 'stale'>

export type RouteParams = Record<string, string>
export type MatchResult = {params: RouteParams}

export type Route = {
  match: (path: string) => MatchResult | undefined
  build: (params: RouteParams) => string
}
