import { FC } from 'react'
import { toast } from 'react-toastify'
import ControlPointIcon from '@mui/icons-material/ControlPoint'

import { useCart } from 'store'

interface Props {
  data: any
}

const AddCartItem: FC<Props> = ({ data }) => {
  const { state, dispatch } = useCart()

  const handleAddItem = (item: any) => {
    const findElem = state.cart_products.find(
      (cartItem: any) => cartItem.id === item.id
    )

    if (findElem) {
      findElem.qtd++
    }

    dispatch({
      type: 'UPDATE_CART',
      payload: {
        cart_products: state.cart_products,
        total_value: state.total_value + Number(item.price),
        total_products: state.total_products + 1,
      },
    })
    toast.success('Produto adicionado com sucesso!!', {
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
    <ControlPointIcon
      data-cy='button-add-one'
      color='secondary'
      onClick={() => handleAddItem(data)}
    />
  )
}

export default AddCartItem
