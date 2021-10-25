import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { List, ListItem, Typography, Box, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ControlPointIcon from '@mui/icons-material/ControlPoint'

import {
  ModalConfirmation,
  RemoveCartItem,
  AddCartItem,
  ResetCart,
} from 'components'

import { formatMoney } from 'helpers'

import { useCart } from 'store'

interface Props {
  inCart: boolean
  setOpenCart: any
}

const CartDetail: FC<Props> = ({ inCart, setOpenCart }) => {
  const [openDialog, setOpenDialog] = useState(null)

  const { state, dispatch } = useCart()

  const handleChangeCart = (e: any, item: any) => {
    const inputValue = Number(e.target.value)

    if (e.target.value === '') {
      return false
    }
    const findElem = state.cart_products.find(
      (cartItem: any) => cartItem.id === item.id
    )

    if (findElem && inputValue > item.stock) {
      const newValue = item.stock * Number(item.price)
      const oldValue = findElem.qtd * Number(item.price)
      dispatch({
        type: 'UPDATE_CART',
        state: {
          cart_products: state.cart_products,
          total_value: state.total_value - oldValue + newValue,
          total_products: state.total_products - findElem.qtd + item.stock,
        },
      })
      findElem.qtd = item.stock
    }

    if (findElem && inputValue < item.stock) {
      const newValue = inputValue * Number(item.price)
      const oldValue = findElem.qtd * Number(item.price)
      dispatch({
        type: 'UPDATE_CART',
        state: {
          cart_products: state.cart_products,
          total_value: state.total_value - oldValue + newValue,
          total_products: state.total_products - findElem.qtd + inputValue,
        },
      })
      findElem.qtd = inputValue
    }
  }

  return (
    <>
      <List>
        <Box
          sx={{
            display: { sx: 'block', sm: 'flex', md: 'none' },
          }}
        >
          {!inCart && (
            <CloseIcon
              sx={{ fontSize: '48px' }}
              color='secondary'
              onClick={() => setOpenCart(false)}
            />
          )}
        </Box>
        {state?.cart_products?.length > 0 ? (
          state?.cart_products?.map((item: any) => (
            <Box key={item.id} sx={{ marginTop: '15px' }}>
              <ListItem>
                <Box sx={{ margin: '10px' }}>
                  <img
                    style={{ width: '80px' }}
                    src={`${item.image}?w=164&h=164&fit=crop&auto=format`}
                    alt={item.name}
                    loading='lazy'
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: inCart ? 'wrap' : 'nowrap',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                  component='div'
                >
                  <Box>
                    <Link to={`/product-detail/${item.id}`}>
                      <Typography
                        sx={{ maxWidth: '300px', width: '100%' }}
                        variant='h6'
                        color='secondary'
                        component='div'
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant='h6'
                        color='#333'
                        noWrap
                        component='div'
                      >
                        un: {item.qtd} total:
                        {formatMoney(Number(item.price) * item.qtd)}
                      </Typography>
                      <Typography
                        variant='caption'
                        color={item.qtd > item.stock ? 'error' : '#333'}
                        noWrap
                        component='div'
                      >
                        {item.qtd > item.stock
                          ? `Não há estoque disponível`
                          : `${item.stock} disponíveis`}
                      </Typography>
                    </Link>
                  </Box>
                  {inCart && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                      }}
                    >
                      <RemoveCartItem data={item} dialog={setOpenDialog} />
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField
                          data-cy='input-change-value'
                          sx={{ maxWidth: '100px' }}
                          size='small'
                          label=''
                          defaultValue={item.qtd}
                          value={item.qtd}
                          onChange={(e) => handleChangeCart(e, item)}
                          variant='outlined'
                          color='secondary'
                        />
                      </Box>
                      {item.qtd < item.stock ? (
                        <AddCartItem data={item} />
                      ) : (
                        <ControlPointIcon sx={{ color: '#e6e6e6' }} />
                      )}
                    </Box>
                  )}
                  {!inCart && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        marginLeft: '20px',
                      }}
                    >
                      <AddCartItem data={item} />
                      <RemoveCartItem data={item} dialog={setOpenDialog} />
                    </Box>
                  )}
                </Box>
              </ListItem>
            </Box>
          ))
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '300px',
            }}
          >
            <Typography
              variant='h6'
              color='#333'
              noWrap
              component='h6'
              sx={{ textAlign: 'center' }}
            >
              Seu carrinho está vazio =(
            </Typography>
            <Link to='/' onClick={() => (inCart ? {} : setOpenCart(false))}>
              <Typography
                variant='h5'
                color='secondary'
                noWrap
                component='h5'
                sx={{
                  textAlign: 'center',
                  marginTop: '20px',
                }}
              >
                adicione seu primeiro produto
              </Typography>
            </Link>
          </Box>
        )}
        {state?.cart_products?.length > 0 && (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: '95%',
                marginTop: '15px',
                justifyContent: `${inCart ? 'space-between' : 'flex-end'}`,
                alignItems: 'center',
              }}
            >
              {inCart && (
                <>
                  <Link to='/'>
                    <Typography
                      variant='caption'
                      color='secondary'
                      noWrap
                      component='div'
                      sx={{ textAlign: 'center' }}
                    >
                      Continuar comprando
                    </Typography>
                  </Link>
                  <Box sx={{ maxWidth: '280px' }}>
                    <ResetCart />
                  </Box>
                </>
              )}
            </Box>
          </Box>
        )}
      </List>
      <ModalConfirmation
        data={openDialog}
        handleClose={() => setOpenDialog(null)}
      />
    </>
  )
}

export default CartDetail
