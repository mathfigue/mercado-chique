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
    <Box
      className='scale'
      sx={{
        margin: '15px',
        maxWidth: '280px',
        width: '100%',
        border: 'none',
        borderRadius: '10px',
      }}
    >
      <Card
        key={data.id}
        variant='outlined'
        sx={{
          minHeight: '420px',
          paddingBottom: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: 'none',
          borderRadius: '10px',
        }}
      >
        <CardContent sx={{ padding: '0' }}>
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
              style={{ width: '100%', border: 'none' }}
              src={`${data.image}?w=164&h=164&fit=crop&auto=format`}
              alt={data.name}
              loading='lazy'
            />
          </Box>
          <Box sx={{ padding: '10px' }}>
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
                sx={{ marginLeft: '10px' }}
                color='success.light'
                noWrap
              >
                Frete grátis
              </Typography>
            )}
          </Box>
          <Box sx={{ padding: '0 10px' }}>
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
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <ButtonAddCart product={data} />
        </CardActions>
      </Card>
    </Box>
  )
}

export default CardProduct
