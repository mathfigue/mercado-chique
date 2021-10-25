import { FC, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Box, CircularProgress, Typography, Paper, Button } from '@mui/material'

import { getProductsList, CartItem } from 'services/products'

import {
  AddCartItem,
  RemoveCartItem,
  ModalConfirmation,
  ButtonAddCart,
} from 'components'

import { formatMoney } from 'helpers'

import { useCart } from 'store'

interface Params {
  id?: string | undefined
}

const ProductDetail: FC = () => {
  const [product, setProduct] = useState<CartItem | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(null)

  const { state } = useCart()

  const params = useParams<Params>()

  useEffect(() => {
    const handleGet = async () => {
      try {
        setIsLoading(true)
        const { data } = await getProductsList()

        const findProduct = data.find(
          (item) => Number(item.id) === Number(params.id)
        )

        setProduct(findProduct)
      } catch (e) {
        console.log(`Não foi possível obter os dados ${e}`)
      } finally {
        setIsLoading(false)
      }
    }
    handleGet()
  }, [params.id])

  return isLoading ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '500px',
      }}
    >
      <CircularProgress color='secondary' />
    </Box>
  ) : (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '50px 20px',
        }}
      >
        <Paper
          className={'animation-slidedown'}
          sx={{ maxWidth: '500px', width: '100%', padding: '20px 20px 30px' }}
          elevation={3}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              className='box'
              sx={{
                position: 'relative',
                minWidth: '164px',
                minHeight: '164px',
                zIndex: 22,
              }}
            >
              <img
                style={{ width: '100%', maxWidth: '350px' }}
                src={`${product?.image}?w=164&h=164&fit=crop&auto=format`}
                alt={product?.name}
                loading='lazy'
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '350px',
                width: '100%',
              }}
            >
              <Typography
                variant='h5'
                color='secondary'
                component='div'
                sx={{ textAlign: 'center', padding: '10px 0' }}
              >
                {product?.name}
              </Typography>
              <Typography
                variant='caption'
                color='secondary'
                noWrap
                component='div'
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                Valor unidade:
                <Typography
                  sx={{ marginLeft: '15px' }}
                  variant='h6'
                  color='#333'
                  noWrap
                  component='div'
                >
                  {formatMoney(Number(product?.price))}
                </Typography>
              </Typography>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                variant='caption'
                color='secondary'
                noWrap
                component='div'
              >
                Disponível:
                <Typography
                  sx={{ marginLeft: '15px' }}
                  variant='h6'
                  color='#333'
                  noWrap
                  component='div'
                >
                  {product?.stock}
                </Typography>
              </Typography>
            </Box>
          </Box>
          {state?.cart_products?.find(
            (item) => Number(item.id) === Number(product?.id)
          ) && (
            <Box sx={{ marginTop: '25px' }}>
              <Typography
                variant='h6'
                color='#333'
                noWrap
                component='div'
                sx={{ textAlign: 'center' }}
              >
                Valor total:
                {formatMoney(
                  Number(
                    state?.cart_products?.find(
                      (item) => Number(item.id) === Number(product?.id)
                    )?.qtd
                  ) * Number(product?.price)
                )}
              </Typography>
            </Box>
          )}
          {state?.cart_products?.find(
            (item) => Number(item.id) === Number(product?.id)
          )?.qtd ? (
            <Box
              className='animation-slidedown'
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '25px',
              }}
            >
              <RemoveCartItem data={product} dialog={setOpenDialog} />
              <Typography
                variant='h6'
                color='#333'
                noWrap
                component='div'
                sx={{ textAlign: 'center', padding: '0 15px' }}
              >
                {state?.cart_products?.find(
                  (item) => Number(item.id) === Number(product?.id)
                )?.qtd || 0}
              </Typography>
              {(state?.cart_products?.find(
                (item) => Number(item.id) === Number(product?.id)
              )?.qtd || 0) < (product?.stock || 0) && (
                <AddCartItem data={product} />
              )}
            </Box>
          ) : (
            <ButtonAddCart product={product} />
          )}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '50px',
              width: '100%',
            }}
          >
            <Link data-cy='button-back-dashboard' to='/'>
              <Button
                sx={{ maxWidth: '380px', width: '100%' }}
                variant='contained'
                color='secondary'
              >
                Voltar
              </Button>
            </Link>
          </Box>
        </Paper>
      </Box>
      <ModalConfirmation
        data={openDialog}
        handleClose={() => setOpenDialog(null)}
      />
    </>
  )
}
export default ProductDetail
