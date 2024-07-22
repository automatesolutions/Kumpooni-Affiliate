import React, { PropsWithChildren, useCallback, useRef, useState } from 'react'
import {
  View,
  StyleSheet,
  SectionList,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
  StyleProp,
  ViewStyle,
  Image,
  ActivityIndicator,
} from 'react-native'
import { Text } from '#/components/Typography'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useTheme, atoms as a } from '#/theme'
import {
  AllNavigatorParams,
  CommonNavigatorParams,
  NavigationProp,
} from '#/lib/routes/types'
import { HStack } from '#/components/HStack'
import { UserAvatar } from '#/view/com/util/UserAvatar'

import { Calendar, Clock, Settings, Store } from 'lucide-react-native'

import { color } from '#/theme/tokens'
import { SettingCard } from '#/view/com/setting/SettingCard'

import { StoreProfile, useStoreProfileQuery } from '#/state/queries/profile'
import { useSession } from '#/state/session'

import { useModalControls } from '#/state/modals'
import { useDialogControl } from '#/components/Dialog'
import { BusinessHoursDialog } from '#/components/dialogs/BusinessHours'

import { useNavigation } from '@react-navigation/native'
const TABS = ['Store Information', 'Business Information'] as const

type Props = NativeStackScreenProps<AllNavigatorParams, 'Settings'>
export function SettingsScreen(props: Props) {
  const t = useTheme()
  const { session } = useSession()
  const {
    data: storeProfile,
    error,
    isLoading,
  } = useStoreProfileQuery(session?.store_id!)

  return (
    <ScrollView style={[a.mb_lg]} contentContainerStyle={[a.flex_1]}>
      <View style={[a.justify_start, a.mx_3xl, a.mt_2xl]}>
        <Text style={[a.text_2xl, a.font_semibold]}>Settings</Text>
      </View>
      {isLoading ? (
        <Container style={[a.justify_center, a.align_center]}>
          <ActivityIndicator size={'large'} color={'#000'} />
        </Container>
      ) : error || !storeProfile ? (
        <Container style={[a.justify_center, a.align_center]}>
          <Text style={[a.text_lg, a.font_bold]}>Something went wrong! </Text>
          <Text>Please try again</Text>
        </Container>
      ) : (
        <ProfileScreenLoaded profile={storeProfile} />
      )}
    </ScrollView>
  )
}

function Container({
  children,
  style,
}: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  const t = useTheme()
  return (
    <View
      style={[
        a.flex_1,
        t.atoms.bg,
        a.mx_5xl,
        a.mt_sm,
        a.rounded_md,
        a.px_lg,
        a.py_sm,
        style,
      ]}>
      {children}
    </View>
  )
}

function ProfileScreenLoaded({ profile }: { profile: StoreProfile }) {
  const [storeImg, setStoreImg] = useState(profile.store_img)
  const { openModal } = useModalControls()
  const businessHoursControl = useDialogControl()

  const navigation = useNavigation<NavigationProp>()
  const onPressShopProfile = useCallback(() => {
    openModal({
      name: 'store-profile',
      profile: profile,
    })
  }, [profile, openModal])
  const onPressAccountSetting = useCallback(() => {
    navigation.navigate('AccountSetting')
  }, [navigation])
  const onPressBusinessHours = useCallback(() => {
    businessHoursControl.open()
  }, [businessHoursControl])

  const onPressHoliday = useCallback(() => {
    navigation.navigate('HolidayMode')
  }, [navigation])
  const t = useTheme()
  return (
    <>
      <View
        style={[a.flex_1, t.atoms.bg, a.mx_2xl, a.mt_sm, a.rounded_md, a.p_sm]}>
        <HStack
          style={[
            a.gap_3xl,
            a.align_start,
            a.border_b,
            a.pb_md,
            t.atoms.border_contrast_low,
          ]}>
          <View style={[styles.aviStyle]}>
            <UserAvatar
              type="store"
              size={77}
              avatar={storeImg}
              // onSelectNewAvatar={onSelectNewAvatar}
            />
          </View>

          <View style={[a.gap_md]}>
            <View>
              <Text style={[a.font_bold, a.text_lg]}>{profile.name}</Text>
            </View>
          </View>
        </HStack>
        <View style={[a.pt_sm, a.gap_lg]}>
          <Text style={[a.text_lg, a.font_bold]}>Business Information</Text>
          <HStack style={[a.gap_md]}>
            <SettingCard
              title="Store Profile"
              icon={<Store size={32} color={color.gray_700} />}
              helperText="Manage Store Profile"
              onPress={onPressShopProfile}
            />
            {/* <SettingCard
            title="Business Information"
            icon={<BriefcaseBusiness size={32} color={color.gray_700} />}
            helperText="Your identity info"
            onPress={onPressBusinessInformation}
          /> */}
            <SettingCard
              title="Account Setting"
              icon={<Settings size={32} color={color.gray_700} />}
              helperText="Manage Login Account"
              onPress={onPressAccountSetting}
            />
            <View style={[a.flex_1, a.px_md, { width: '100%' }]} />
          </HStack>
        </View>
        <View style={[a.pt_sm, a.gap_lg]}>
          <Text style={[a.text_xl, a.font_bold]}>Store Setting</Text>
          <HStack style={[a.gap_md]}>
            <SettingCard
              title="Business Hours"
              icon={<Clock size={32} color={color.gray_700} />}
              helperText="Manage Opening and Closing Time"
              onPress={onPressBusinessHours}
            />
            <SettingCard
              title="Holiday Mode"
              icon={<Calendar size={32} color={color.gray_700} />}
              helperText="Manage Closed Dates"
              onPress={onPressHoliday}
            />
            <View style={[a.flex_1, a.px_md, { width: '100%' }]} />
            {/* <SettingCard
                title="Holiday Mode"
                icon={<BriefcaseBusiness size={32} color={color.gray_700} />}
                helperText="Manage Closed Dates"
              /> */}
          </HStack>
        </View>
      </View>
      <BusinessHoursDialog control={businessHoursControl} />
    </>
  )
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  categoryText: {
    fontSize: 14,
  },
  categoryTextActive: {
    fontSize: 14,
    color: '#000',
  },
  categoriesBtn: {
    padding: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  categoriesBtnActive: {
    padding: 10,
    paddingHorizontal: 14,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  block: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 16,
    gap: 20,
  },
  activeTab: {
    borderBottomColor: 'red',
  },
  aviStyle: {
    width: 79,
    height: 79,
    borderWidth: 1,
    borderRadius: 8,
  },
})
