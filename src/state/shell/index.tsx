import React from 'react'
import { Provider as ColorModeProvider } from './color-mode'
import { Provider as GlobalLoadingProvider } from './global-loading'
import { Provider as SidebarProvider } from './sidebar'
import { Sidebar } from 'lucide-react-native'
// import { Provider as DrawerOpenProvider } from './drawer-open'
// import { Provider as DrawerSwipableProvider } from './drawer-swipe-enabled'
export { useThemePrefs, useSetThemePrefs } from './color-mode'
export function Provider({ children }: React.PropsWithChildren<{}>) {
  return (
    // <DrawerOpenProvider>
    //   <DrawerSwipableProvider>
    <ColorModeProvider>
      <GlobalLoadingProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </GlobalLoadingProvider>
    </ColorModeProvider>
    //   </DrawerSwipableProvider>
    // </DrawerOpenProvider>
  )
}
