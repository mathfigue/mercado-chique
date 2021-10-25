import { CartItem } from 'services/products'

export type Action =
  | { type: 'UPDATE_CART'; state: any }
  | { type: 'RESET_CART' }
  | { type: 'default' }
export type StateProps = {
  cart_products: CartItem[]
  total_value: number
  total_products: number
}

const reduce = (state: StateProps, action: Action) => {
  switch (action.type) {
    case 'UPDATE_CART': {
      return { ...action.state }
    }
    case 'RESET_CART': {
      return { cart_products: [], total_value: 0, total_products: 0 }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export default reduce
