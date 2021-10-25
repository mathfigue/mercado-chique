import { FC } from 'react'
import { toast } from 'react-toastify'
import { Button, Typography } from '@mui/material'

import { useCart } from 'store'

const ResetCart: FC = () => {
  const { state, dispatch } = useCart()

  const handleResetCart = () => {
    dispatch({ type: 'RESET_CART' })
    toast.error('Carrinho foi limpo com sucesso!')
  }

  return (
    <Button
      data-cy='button-reset-cart'
      sx={{ width: ' 100%' }}
      onClick={() => handleResetCart()}
      variant='contained'
      color='error'
      disabled={state?.cart_products?.length > 0 ? false : true}
    >
      <Typography variant='caption' color='#fff' noWrap component='p'>
        Limpar Carrinho
      </Typography>
    </Button>
  )
}

export default ResetCart
