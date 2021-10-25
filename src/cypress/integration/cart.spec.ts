import {
  openingCartDetail,
  searchingProducts,
  addSearchProducts,
  goingToCart,
  addOneProduct,
  removeOneProduct,
  changeValueCart,
  doingCheckout,
  returningDashboard,
} from '../functions'

it('cart checkout', () => {
  cy.visit('http://localhost:3000')
  searchingProducts('Small Cotton Shoes')
  addSearchProducts()
  openingCartDetail()
  goingToCart()
  addOneProduct()
  addOneProduct()
  addOneProduct()
  removeOneProduct()
  removeOneProduct()
  changeValueCart('999999999')
  returningDashboard()
  searchingProducts('rustic')
  addSearchProducts()
  openingCartDetail()
  goingToCart()
  addOneProduct()
  addOneProduct()
  addOneProduct()
  doingCheckout()
})

export {}
