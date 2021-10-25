import { FC } from 'react'
import { toast } from 'react-toastify'
import { Box, Button } from '@mui/material'

import { CartItem } from 'services/products'

import { useCart } from 'store'

interface Props {
  product: CartItem | undefined
}

const ButtonAddCart: FC<Props> = ({ product }) => {
  const { state, dispatch } = useCart()

  const handleAddCart = (item: any) => {
    const findElem = state.cart_products.find(
      (cartItem) => cartItem.id === item.id
    )

    if (findElem) {
      findElem.qtd++
    } else {
      state.cart_products.push({ ...item, qtd: 1 })
    }

    dispatch({
      type: 'UPDATE_CART',
      state: {
        cart_products: state.cart_products,
        total_value: state.total_value + Number(item.price),
        total_products: state.total_products + 1,
      },
    })
    toast.success('Produto adicionado com sucesso!!')
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '25px',
      }}
    >
      <Button
        data-cy='button-add-product'
        onClick={() => handleAddCart(product)}
        variant='contained'
        color='secondary'
      >
        Adicionar no carrinho
      </Button>
    </Box>
  )
}

export default ButtonAddCart
