import React from 'react'
import { useNonReactiveCallback } from '#/lib/hooks/useNonReactiveCallback'
import { OrderLinePart, OrderLineService } from '#/modules/orders'
import { ServiceLinePartSchema } from '#/modules/parts/parts.model'

export type SideBarOpts = {
  orderLineService?: OrderLineService
  orderLinePart?: OrderLinePart
  serviceLinePart?: ServiceLinePartSchema
  showSidebar?: boolean
}

type StateContext = SideBarOpts | undefined
type ControlsContext = {
  openSidebar: (opts: SideBarOpts) => void
  closeSidebar: () => boolean
}

const stateContext = React.createContext<StateContext>(undefined)
const controlsContext = React.createContext<ControlsContext>({
  openSidebar: (_opts: SideBarOpts) => {},
  closeSidebar() {
    return false
  },
})

export function Provider({ children }: React.PropsWithChildren<{}>) {
  const [state, setState] = React.useState<StateContext>()

  const openSidebar = useNonReactiveCallback((opts: SideBarOpts) => {
    setState(opts)
  })
  const closeSidebar = useNonReactiveCallback(() => {
    let wasOpen = !!state
    setState({
      showSidebar: false,
      orderLinePart: undefined,
      orderLineService: undefined,
      serviceLinePart: undefined,
    })
    return wasOpen
  })
  const api = React.useMemo(
    () => ({
      openSidebar,
      closeSidebar,
    }),
    [openSidebar, closeSidebar],
  )

  return (
    <stateContext.Provider value={state}>
      <controlsContext.Provider value={api}>
        {children}
      </controlsContext.Provider>
    </stateContext.Provider>
  )
}

export function useSidebarState() {
  return React.useContext(stateContext)
}

export function useSidebarControls() {
  return React.useContext(controlsContext)
}
