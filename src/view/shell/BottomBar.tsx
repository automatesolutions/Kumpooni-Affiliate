import React, {ComponentProps, useLayoutEffect} from 'react'
import Animated from 'react-native-reanimated'
import {GestureResponderEvent, TouchableOpacity, View} from 'react-native'
import {StackActions} from '@react-navigation/native'

import {
  HomeIcon,
  HomeIconSolid,
  MyAccountIcon,
  MyAccountIconSolid,
  OrdersIcon,
  OrdersIconSolid,
  PartsIcon,
  PartsIconSolid,
  ServicesIcon,
  ServicesIconSolid,
} from '#/lib/icons'
import {BottomTabBarProps} from '@react-navigation/bottom-tabs'
import {useNavigationTabState} from '#/lib/hooks/useNavigationTabState'
import {TabState, getTabState} from '#/lib/routes/helpers'
import {useDedupe} from '#/lib/hooks/useDedupe'

import {atoms as a} from '#/theme'
import {useSession} from '#/state/session'
import {Text} from '#/components/Typography'
import {styles} from './BottomBarStyles'
type TabOptions = 'Home' | 'Orders' | 'Services' | 'Parts' | 'Settings'
interface BtnProps
  extends Pick<
    ComponentProps<typeof TouchableOpacity>,
    | 'accessible'
    | 'accessibilityRole'
    | 'accessibilityHint'
    | 'accessibilityLabel'
  > {
  testID?: string
  icon: JSX.Element
  label: string
  isActive: boolean
  notificationCount?: string
  onPress?: (event: GestureResponderEvent) => void
  onLongPress?: (event: GestureResponderEvent) => void
}
export function BottomBar({navigation}: BottomTabBarProps) {
  const dedupe = useDedupe()
  const {hasSession} = useSession()

  const {isAtHome, isAtOrders, isAtService, isAtParts, isAtSettings} =
    useNavigationTabState()

  const hideBottomBar = !hasSession

  const onPressTab = React.useCallback(
    (tab: TabOptions) => {
      const state = navigation.getState()

      const tabState = getTabState(state, tab)

      if (tabState === TabState.InsideAtRoot) {
      } else if (tabState === TabState.Inside) {
        dedupe(() => navigation.dispatch(StackActions.popToTop()))
      } else {
        dedupe(() => navigation.navigate(`${tab}Tab`))
      }
    },
    [navigation, dedupe],
  )
  const onPressHome = React.useCallback(() => onPressTab('Home'), [onPressTab])
  const onPressOrders = React.useCallback(
    () => onPressTab('Orders'),
    [onPressTab],
  )
  const onPressServices = React.useCallback(
    () => onPressTab('Services'),
    [onPressTab],
  )
  const onPressParts = React.useCallback(
    () => onPressTab('Parts'),
    [onPressTab],
  )
  const onPressSettings = React.useCallback(
    () => onPressTab('Settings'),
    [onPressTab],
  )

  return (
    <Animated.View
      style={[
        styles.bottomBar,
        {
          paddingBottom: 2,
          // display: 'flex',
          display:
            isAtSettings ||
            isAtService ||
            isAtParts ||
            isAtOrders ||
            hideBottomBar
              ? 'none'
              : 'flex',
        },
      ]}>
      <Btn
        testID="bottomBarHomeBtn"
        label="Home"
        isActive={isAtHome}
        icon={
          isAtHome ? (
            <HomeIconSolid
              strokeWidth={4}
              size={26}
              style={[styles.ctrlIcon, {color: '#b61616'}, styles.homeIcon]}
            />
          ) : (
            <HomeIcon
              strokeWidth={4}
              size={26}
              style={[styles.ctrlIcon, {color: '#000'}, styles.homeIcon]}
            />
          )
        }
        onPress={onPressHome}
        accessibilityRole="tab"
        accessibilityLabel={`Home`}
        accessibilityHint=""
      />
      <Btn
        testID="bottomBarHomeBtn"
        label="Orders"
        isActive={isAtOrders}
        icon={
          isAtOrders ? (
            <OrdersIconSolid
              strokeWidth={0.1}
              size={26}
              style={[styles.ctrlIcon, {color: '#b61616'}, styles.orderIcon]}
            />
          ) : (
            <OrdersIcon
              strokeWidth={0.3}
              size={26}
              style={[styles.ctrlIcon, {color: '#000'}, styles.orderIcon]}
            />
          )
        }
        onPress={onPressOrders}
        accessibilityRole="tab"
        accessibilityLabel={`Orders`}
        accessibilityHint=""
      />
      <Btn
        testID="bottomBarHomeBtn"
        label="Services"
        isActive={isAtService}
        icon={
          isAtService ? (
            <ServicesIconSolid
              strokeWidth={23}
              size={26}
              style={[styles.ctrlIcon, {color: '#b61616'}, styles.orderIcon]}
            />
          ) : (
            <ServicesIcon
              strokeWidth={1.8}
              size={26}
              style={[styles.ctrlIcon, {color: '#000'}, styles.orderIcon]}
            />
          )
        }
        onPress={onPressServices}
        accessibilityRole="tab"
        accessibilityLabel={`Store`}
        accessibilityHint=""
      />
      <Btn
        testID="bottomBarHomeBtn"
        label="Parts"
        isActive={isAtParts}
        icon={
          isAtParts ? (
            <PartsIconSolid
              size={24}
              style={[styles.ctrlIcon, {color: '#b61616'}, styles.partIcon]}
            />
          ) : (
            <PartsIcon
              strokeWidth={1.8}
              size={26}
              style={[styles.ctrlIcon, {color: '#000'}, styles.partIcon]}
            />
          )
        }
        onPress={onPressParts}
        accessibilityRole="tab"
        accessibilityLabel={`Store`}
        accessibilityHint=""
      />
      <Btn
        testID="bottomBarHomeBtn"
        label="My Account"
        isActive={isAtSettings}
        icon={
          isAtSettings ? (
            <MyAccountIconSolid
              strokeWidth={2}
              size={26}
              style={[styles.ctrlIcon, {color: '#b61616'}, styles.accountIcon]}
            />
          ) : (
            <MyAccountIcon
              strokeWidth={2}
              size={26}
              style={[styles.ctrlIcon, {color: '#000'}, styles.accountIcon]}
            />
          )
        }
        onPress={onPressSettings}
        accessibilityRole="tab"
        accessibilityLabel={`MyAccount`}
        accessibilityHint=""
      />
    </Animated.View>
  )
}

function Btn({
  testID,
  icon,
  notificationCount,
  onPress,
  onLongPress,
  accessible,
  accessibilityHint,
  accessibilityLabel,
  isActive,
  label,
}: BtnProps) {
  return (
    <TouchableOpacity
      testID={testID}
      style={styles.ctrl}
      onPress={onLongPress ? onPress : undefined}
      onPressIn={onLongPress ? undefined : onPress}
      onLongPress={onLongPress}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}>
      {notificationCount ? (
        <View style={[styles.notificationCount]}>
          <Text style={styles.notificationCountLabel}>{notificationCount}</Text>
        </View>
      ) : undefined}
      {icon}
      <Text
        style={[
          a.text_center,
          a.text_md,
          isActive ? a.font_bold : a.font_normal,
          {color: isActive ? '#b61616' : '#000'},
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}
