import { FC } from 'react'
import { toast } from 'react-toastify'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'

import { useCart } from 'store'

interface Props {
  data: any
  dialog: any
}

const AddCartItem: FC<Props> = ({ data, dialog }) => {
  const { state, dispatch } = useCart()

  const handleRemoveItem = (item: any) => {
    const findElem = state.cart_products.find(
      (cartItem) => cartItem.id === item.id
    )

    if (findElem?.qtd === 1) {
      return dialog(item)
    }

    if (findElem) {
      findElem.qtd--
    }

    dispatch({
      type: 'UPDATE_CART',
      state: {
        cart_products: state.cart_products,
        total_value: state.total_value - Number(item.price),
        total_products: state.total_products - 1,
      },
    })
    toast.info('Produto removido com sucesso!!', {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  return (
    <RemoveCircleOutlineIcon
      data-cy='button-remove-one'
      color='secondary'
      onClick={() => handleRemoveItem(data)}
    />
  )
}

export default AddCartItem
