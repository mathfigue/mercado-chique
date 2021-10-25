import { FC, useState } from 'react'
import { Paper, Box, Divider, Typography, Button } from '@mui/material'

import { CartDetail, CheckOut } from 'components'

import { formatMoney } from 'helpers'

import { useCart } from 'store'

const Cart: FC = () => {
  const [checkOut, setCheckOut] = useState(false)
  const { state, dispatch } = useCart()

  const handleCheckout = () => {
    dispatch({ type: 'RESET_CART' })
    setCheckOut(true)
  }

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', padding: '50px 20px' }}
    >
      <Paper
        className='animation-slidedown'
        sx={{ maxWidth: '800px', width: '100%' }}
        elevation={3}
      >
        <CartDetail inCart={true} setOpenCart={null} />
        <Divider sx={{ padding: '25px 0' }} />
        {state.total_products > 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              flexDirection: 'column',
              padding: '25px',
            }}
          >
            <Typography variant='h6' color='#333' noWrap component='div'>
              Qtd items {state.total_products}
            </Typography>
            <Typography variant='h6' color='#333' noWrap component='div'>
              Total {formatMoney(state.total_value)}
            </Typography>
            <Typography variant='caption' color='#333' noWrap component='div'>
              ou 12x de {formatMoney(state.total_value / 12)}
            </Typography>
            {state.total_value > 300 && (
              <Typography
                variant='h6'
                color='success.light'
                noWrap
                component='div'
              >
                Frete grátis
              </Typography>
            )}
            <Button
              data-cy='button-cart-checkout'
              sx={{ marginTop: '30px' }}
              variant='contained'
              color='secondary'
              onClick={() => handleCheckout()}
            >
              Finalizar compra
            </Button>
          </Box>
        )}
      </Paper>
      <CheckOut open={checkOut} onClose={setCheckOut} />
    </Box>
  )
}
export default Cart
