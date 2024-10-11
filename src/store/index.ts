import { createContext, useContext } from 'react'
import counterStore from './counter'

export const StoreContext = createContext({
  counterStore,
})

// 自定义hook
export const useStores = () => {
  const store = useContext(StoreContext)
  if (!store) {
    // this is especially useful in TypeScript so you don't need to assert the types manually.
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return store
}
