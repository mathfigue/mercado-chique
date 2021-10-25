import { createContext, useContext, useReducer } from 'react'

import reduce, { StateProps, Action } from './reducer'

export type Dispatch = (action: Action) => void
type ProviderProps = { children: React.ReactNode }

export const StateContext = createContext<
  { state: StateProps; dispatch: Dispatch } | undefined
>(undefined)

const StoreProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reduce, {
    cart_products: [],
    total_value: 0,
    total_products: 0,
  })

  const value = { state, dispatch }
  return <StateContext.Provider value={value}>{children}</StateContext.Provider>
}

const useCart = () => {
  const context = useContext(StateContext)
  if (context === undefined) {
    throw new Error('Ocorreu um erro inesperado.')
  }
  return context
}

export { StoreProvider, useCart }
