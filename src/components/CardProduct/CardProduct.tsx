import { FC } from 'react'
import { Link } from 'react-router-dom'

import { Card, CardActions, CardContent, Typography, Box } from '@mui/material'

import { ButtonAddCart } from 'components'

import { formatMoney } from 'helpers'

interface Props {
  data: any
}

const CardProduct: FC<Props> = ({ data }) => {
  return (
    <Box className='scale' sx={cardContainer}>
      <Card key={data.id} variant='outlined' sx={cardStyle}>
        <CardContent sx={{ padding: '0' }}>
          <Box className='box' sx={imgBox}>
            <img
              style={{ width: '100%', border: 'none' }}
              src={`${data.image}?w=164&h=164&fit=crop&auto=format`}
              alt={data.name}
              loading='lazy'
            />
          </Box>
          <Box sx={{ p: '10px' }}>
            <Typography
              sx={{ fontSize: 18, fontWeight: 'bold' }}
              color='text.secondary'
              gutterBottom
            >
              {data.name}
            </Typography>
            <Typography
              sx={{ fontSize: 16, fontWeight: 'bold' }}
              color='text.secondary'
            >
              {formatMoney(Number(data.price))}
            </Typography>
            <Typography variant='caption' color='text.secondary' gutterBottom>
              12x {formatMoney(Number(data.price) / 12)} sem juros
            </Typography>
            {Number(data.price) > 300 && (
              <Typography
                variant='caption'
                sx={{ ml: '10px' }}
                color='success.light'
                noWrap
              >
                Frete grátis
              </Typography>
            )}
          </Box>
          <Box sx={{ p: '0 10px' }}>
            <Link
              data-cy='link-to-product-details'
              to={`/product-detail/${data.id}`}
            >
              <Typography
                sx={{ textDecoration: 'underline' }}
                variant='caption'
                color='secondary'
              >
                detalhes
              </Typography>
            </Link>
          </Box>
        </CardContent>
        <CardActions sx={center}>
          <ButtonAddCart product={data} />
        </CardActions>
      </Card>
    </Box>
  )
}

const center = {
  display: 'flex',
  justifyContent: 'center',
}

const cardContainer = {
  margin: '15px',
  maxWidth: '280px',
  width: '100%',
  border: 'none',
  borderRadius: '10px',
}

const cardStyle = {
  minHeight: '420px',
  paddingBottom: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  border: 'none',
  borderRadius: '10px',
  flexDirection: 'column' as 'column',
}

const imgBox = {
  minWidth: '164px',
  minHeight: '164px',
  position: ' relative' as 'relative',
  zIndex: 22 as 22,
}

export default CardProduct
