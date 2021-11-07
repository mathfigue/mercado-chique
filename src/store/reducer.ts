import { CartItem } from 'services/products'

export type StateProps = {
  cart_products: CartItem[]
  total_value: number
  total_products: number
}

export type Action =
  | { type: 'UPDATE_CART'; payload: StateProps }
  | { type: 'RESET_CART' }
  | { type: 'default' }

const reduce = (state: StateProps, action: Action) => {
  switch (action.type) {
    case 'UPDATE_CART': {
      return { ...action.payload }
    }
    case 'RESET_CART': {
      return { cart_products: [], total_value: 0, total_products: 0 }
    }
    default: {
      return { ...state }
    }
  }
}

export default reduce
