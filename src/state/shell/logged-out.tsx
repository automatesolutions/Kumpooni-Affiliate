import React from 'react'

type State = {
  showLoggedOut: boolean
}

type Controls = {
  /**
   * Show or hide the logged out view.
   */
  setShowLoggedOut: (show: boolean) => void
}

const StateContext = React.createContext<State>({
  showLoggedOut: false,
})

const ControlsContext = React.createContext<Controls>({
  setShowLoggedOut: () => {},
})

export function Provider({ children }: React.PropsWithChildren<{}>) {
  const [state, setState] = React.useState<State>({
    showLoggedOut: false,
  })

  const controls = React.useMemo<Controls>(
    () => ({
      setShowLoggedOut(show) {
        setState(s => ({
          ...s,
          showLoggedOut: show,
        }))
      },
    }),
    [setState],
  )

  return (
    <StateContext.Provider value={state}>
      <ControlsContext.Provider value={controls}>
        {children}
      </ControlsContext.Provider>
    </StateContext.Provider>
  )
}

export function useLoggedOutView() {
  return React.useContext(StateContext)
}

export function useLoggedOutViewControls() {
  return React.useContext(ControlsContext)
}
