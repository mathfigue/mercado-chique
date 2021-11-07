import { FC } from 'react'
import { toast } from 'react-toastify'
import { Modal, Box, Button, Typography } from '@mui/material'

import { useCart } from 'store'

import { formatMoney } from 'helpers'
interface Props {
  data: any
  handleClose: any
}

const ModalConfirmation: FC<Props> = ({ data, handleClose }) => {
  const { state, dispatch } = useCart()

  const handleRemoveItemCart = (item: any) => {
    dispatch({
      type: 'UPDATE_CART',
      payload: {
        cart_products: state.cart_products.filter(
          (product) => product.id !== item.id
        ),
        total_value: state.total_value - Number(item.price),
        total_products: state.total_products - 1,
      },
    })
    handleClose(null)
    toast.error('Produto removido do carrinho com sucesso!')
  }

  return (
    <Modal
      sx={{ maxWidth: '700px', width: '100%' }}
      open={Boolean(data)}
      onClose={handleClose}
    >
      <Box sx={styledBox}>
        <Typography variant='h5' color='#333' component='h5'>
          Realmente deseja remover o item do carrinho?
        </Typography>
        <Box sx={boxContainer}>
          <img
            style={{ margin: '0 10px 0 0', width: '220px' }}
            src={`${data?.image}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${data?.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={data?.name}
            loading='lazy'
          />
          <Box sx={{ msTouchAction: '15px' }}>
            <Typography variant='h5' color='secondary' noWrap component='h5'>
              {data?.name}
            </Typography>
            <Typography
              sx={{ mt: '10px' }}
              variant='h5'
              color='secondary'
              component='h5'
            >
              Valor un {formatMoney(Number(data?.price))}
            </Typography>
            <Typography
              sx={{ mt: '10px' }}
              variant='caption'
              color='#333'
              component='h6'
            >
              disponíveis {data?.stock}
            </Typography>
          </Box>
        </Box>
        <Box sx={boxAction}>
          <Button
            data-cy='button-modal-cancel-exclusion'
            color='secondary'
            onClick={() => handleClose()}
          >
            Cancelar
          </Button>
          <Button
            data-cy='button-modal-confirm-exclusion'
            variant='contained'
            color='error'
            onClick={() => handleRemoveItemCart(data)}
          >
            Remover
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

const boxAction = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '20px',
  gap: '20px',
}

const styledBox = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  maxWidth: { xs: 300, sm: 600 },
  width: '100%',
  bgcolor: 'white',
  boxShadow: 24,
  borderRadius: '10px',
  border: 'none',
  p: 4,
  padding: '20px',
}

const boxContainer = {
  display: 'flex',
  marginTop: '20px',
  flexDirection: 'column' as 'column',
  alignItems: 'center',
}

export default ModalConfirmation
