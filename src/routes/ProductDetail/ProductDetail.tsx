import { FC, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
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
      } catch {
        toast.error('Não foi possível obter os dados.')
      } finally {
        setIsLoading(false)
      }
    }
    handleGet()
  }, [params.id])

  return isLoading ? (
    <Box sx={{ centerBox, loaderContainer }}>
      <CircularProgress color='secondary' />
    </Box>
  ) : (
    <>
      <Box sx={boxContainer1}>
        <Paper className={'animation-slidedown'} sx={paper} elevation={3}>
          <Box sx={centerBox}>
            <Box className='box' sx={imgBox}>
              <img
                style={{ width: '100%', maxWidth: '350px' }}
                src={`${product?.image}?w=164&h=164&fit=crop&auto=format`}
                alt={product?.name}
                loading='lazy'
              />
            </Box>
          </Box>
          <Box sx={centerBox}>
            <Box sx={boxContainer2}>
              <Typography
                variant='h5'
                color='secondary'
                component='div'
                align='center'
                sx={{ p: '10px 0' }}
              >
                {product?.name}
              </Typography>
              <Typography
                variant='caption'
                color='secondary'
                noWrap
                component='div'
                sx={boxContainer3}
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
                sx={boxContainer3}
                variant='caption'
                color='secondary'
                noWrap
                component='p'
              >
                Disponível:
                <Typography
                  sx={{ ml: '15px' }}
                  variant='h6'
                  color='#333'
                  noWrap
                  component='span'
                >
                  {product?.stock}
                </Typography>
              </Typography>
            </Box>
          </Box>
          {state?.cart_products?.find(
            (item) => Number(item.id) === Number(product?.id)
          ) && (
            <Box sx={{ mt: '25px' }}>
              <Typography
                variant='h6'
                color='#333'
                noWrap
                component='p'
                align='center'
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
            <Box className='animation-slidedown' sx={boxContainer4}>
              <RemoveCartItem data={product} dialog={setOpenDialog} />
              <Typography
                variant='h6'
                color='#333'
                noWrap
                component='p'
                align='center'
                sx={{ p: '0 15px' }}
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
          <Box sx={boxContainer5}>
            <Link data-cy='button-back-dashboard' to='/'>
              <Button
                sx={{ maxWidth: '380px', minWidth: '230px', width: '100%' }}
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

const centerBox = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const loaderContainer = {
  height: '500px',
}

const boxContainer1 = {
  display: 'flex',
  justifyContent: 'center',
  padding: '50px 20px',
}

const imgBox = {
  position: 'relative' as 'relative',
  minWidth: '164px',
  minHeight: '164px',
  zIndex: 22,
}

const boxContainer2 = {
  display: 'flex',
  flexDirection: 'column' as 'column',
  maxWidth: '350px',
  width: '100%',
}

const boxContainer3 = {
  ...centerBox,
  justifyContent: 'space-between',
}

const boxContainer4 = {
  ...centerBox,
  flexDirection: 'row' as 'row',
  marginTop: '25px',
}

const boxContainer5 = {
  ...centerBox,
  marginTop: '50px',
  width: '100%',
}

const paper = { maxWidth: '500px', width: '100%', padding: '20px 20px 30px' }

export default ProductDetail
