import { FC } from 'react'
import { Modal, Box, Typography, Button } from '@mui/material'
interface Props {
  open: boolean
  onClose: any
}

const CheckOut: FC<Props> = ({ onClose, open }) => {
  return (
    <Modal
      className='animation-slidedown'
      open={open}
      onClose={() => onClose(false)}
    >
      <Box sx={style}>
        <Typography variant='h5' component='h2' color='success.light'>
          Parabéns!!
        </Typography>
        <Typography sx={{ mt: 2 }} color='secondary'>
          Sua compra foi finalizada com sucesso!!
        </Typography>
        <Box sx={modalAction}>
          <Button
            onClick={() => onClose(false)}
            variant='contained'
            color='secondary'
          >
            Comprar mais!!
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

const modalAction = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '30px',
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
}

export default CheckOut
