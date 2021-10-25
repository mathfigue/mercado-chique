import client from 'provider/fetchClient'

export interface CartItem {
  id: number
  name: string
  createAt: Date
  price: string
  image: string
  stock: number
  qtd: number
}

export interface CartResponse {
  data: CartItem[]
}

export const getProductsList = (): Promise<CartResponse> =>
  client.get('/product')
