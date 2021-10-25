import { FC, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

import {
  Toolbar,
  Button,
  IconButton,
  Typography,
  Badge,
  Box,
  AppBar,
  Drawer,
} from '@mui/material'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import { CartDetail, ResetCart } from 'components'

import { formatMoney } from 'helpers'

import { useCart } from 'store'

interface Props {
  window?: () => Window
}

const Navbar: FC<any> = (props: Props) => {
  const [openCart, setOpenCart] = useState(false)
  const { window } = props

  const { state } = useCart()

  const history = useHistory()

  const container =
    window !== undefined ? () => window().document.body : undefined

  const handleGoCart = () => {
    setOpenCart(false)
    history.push('/cart')
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <Link data-cy='button-back-dashboard' to='/'>
              <Typography variant='h6' color='secondary' noWrap component='div'>
                Mercado Chique
              </Typography>
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconButton
                data-cy='open-cart-detail'
                size='large'
                edge='end'
                aria-label='account of current user'
                aria-haspopup='true'
                onClick={() => setOpenCart(true)}
                color='inherit'
              >
                <Badge
                  data-cy='cart-icon'
                  badgeContent={state.total_products}
                  color='secondary'
                >
                  <ShoppingCartIcon sx={{ color: '#6e6e6e' }} />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        data-cy='drawer-cart'
        container={container}
        anchor='right'
        open={openCart}
        onClose={() => setOpenCart(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: '100%',
            maxWidth: '500px',
            paddingBottom: '150px',
          },
        }}
      >
        <CartDetail inCart={false} setOpenCart={setOpenCart} />
        {state?.cart_products.length > 0 && (
          <Box
            sx={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              position: 'fixed',
              backgroundColor: 'white',
              bottom: '0',
              width: '100%',
              maxWidth: '500px',
            }}
          >
            <Typography
              data-cy='drawer-total-value'
              variant='h6'
              color='#333'
              noWrap
              component='div'
            >
              Total da compra: {formatMoney(state.total_value)}
            </Typography>
            <Box
              sx={{
                maxWidth: '85%',
                display: 'flex',
                padding: '20px 20px 0',
                gap: '10px',
              }}
            >
              <Button
                data-cy='go-to-cart'
                onClick={() => handleGoCart()}
                variant='contained'
                color='secondary'
                fullWidth
                disabled={state?.cart_products?.length > 0 ? false : true}
              >
                <Typography variant='caption' color='#fff' noWrap component='p'>
                  Finalizar compra
                </Typography>
              </Button>
              <ResetCart />
            </Box>
          </Box>
        )}
      </Drawer>
    </>
  )
}

export default Navbar
