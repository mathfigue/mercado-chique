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
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '50px',
      }}
    >
      <InputSearch search={search} handleSearch={handleSearch} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          marginTop: '50px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '1920px',
            paddingLeft: '15px',
          }}
        >
          {search?.length > 0 ? (
            search.map((item) => <CardProduct data={item} />)
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                minHeight: '300px',
              }}
            >
              <Typography
                variant='h6'
                color='#333'
                noWrap
                component='div'
                sx={{ textAlign: 'center' }}
              >
                Carrinho vazio =(
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              margin: '15px',
              maxWidth: '280px',
              width: '100%',
              border: 'none',
              borderRadius: '10px',
            }}
          ></Box>
          <Box
            sx={{
              margin: '15px',
              maxWidth: '280px',
              width: '100%',
            }}
          ></Box>
          <Box
            sx={{
              margin: '15px',
              maxWidth: '280px',
              width: '100%',
            }}
          ></Box>
          <Box
            sx={{
              margin: '15px',
              maxWidth: '280px',
              width: '100%',
            }}
          ></Box>
          <Box
            sx={{
              margin: '15px',
              maxWidth: '280px',
              width: '100%',
            }}
          ></Box>
        </Box>
      </Box>
    </Box>
  )
}
export default Dashboard
