import { FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Box, CircularProgress, Typography } from '@mui/material'

import { getProductsList, CartItem } from 'services/products'

import { CardProduct, InputSearch } from 'components'

const Dashboard: FC = () => {
  const [productsList, setProductsList] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState<CartItem[]>(productsList)

  useEffect(() => {
    const handleGet = async () => {
      try {
        setIsLoading(true)
        const { data } = await getProductsList()
        setProductsList(data)
        setSearch(data)
      } catch (e) {
        toast.error('Não foi possível carregar lista de produtos.')
      } finally {
        setIsLoading(false)
      }
    }
    handleGet()
  }, [])

  const handleSearch = (text: string) => {
    setSearch(
      productsList.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      )
    )
  }

  return isLoading ? (
    <Box sx={{ ...loaderContainer, ...centerBox }}>
      <CircularProgress color='secondary' />
    </Box>
  ) : (
    <Box sx={{ ...mainContainer, ...centerBox }}>
      <InputSearch search={search} handleSearch={handleSearch} />
      <Box sx={{ ...cardsContainer, ...centerBox }}>
        {search?.length > 0 ? (
          search.map((item) => <CardProduct data={item} />)
        ) : (
          <Box sx={{ ...emptyContainer, ...centerBox }}>
            <Typography
              variant='h6'
              color='#333'
              noWrap
              component='div'
              align='center'
            >
              Carrinho vazio =(
            </Typography>
          </Box>
        )}
        <Box sx={hiddenBox}></Box>
        <Box sx={hiddenBox}></Box>
        <Box sx={hiddenBox}></Box>
        <Box sx={hiddenBox}></Box>
      </Box>
    </Box>
  )
}

const hiddenBox = {
  margin: '15px',
  maxWidth: '280px',
  width: '100%',
}

const centerBox = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const loaderContainer = {
  height: '500px',
}

const mainContainer = {
  marginTop: '50px',
  flexDirection: 'column' as 'column',
}

const cardsContainer = {
  width: '100%',
  maxWidth: '1920px',
  paddingLeft: '15px',
  marginTop: '30px',
  flexWrap: 'wrap' as 'wrap',
}

const emptyContainer = {
  width: '100%',
  minHeight: '300px',
}

export default Dashboard
