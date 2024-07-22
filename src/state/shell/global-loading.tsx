import { WithSpinner } from '#/components/WithSpinner'
import React from 'react'
import { StyleSheet } from 'react-native'

type ControlsContext = {
  hide: () => void
  show: () => void
}
const ControlsContext = React.createContext({
  hide: () => {},
  show: () => {},
})
const TIMEOUT = 5 * 1000
export function Provider({ children }: React.PropsWithChildren<{}>) {
  const [visible, setVisible] = React.useState(false)
  const timer = React.useRef<NodeJS.Timeout | null>(null)
  const hide = () => {
    if (timer.current) {
      timer.current
    }
    setVisible(false)
  }
  const show = () => {
    timer.current = setTimeout(() => hide(), TIMEOUT)
    setVisible(true)
  }
  return (
    <ControlsContext.Provider value={{ show, hide }}>
      <WithSpinner isLoading={visible} style={StyleSheet.absoluteFill} flex={1}>
        {children}
      </WithSpinner>
    </ControlsContext.Provider>
  )
}

export function useGlobalLoadingControls() {
  return React.useContext(ControlsContext)
}
