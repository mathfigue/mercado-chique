import {
  searchingProducts,
  clearInputSearch,
  addSearchProducts,
  addMultipleProduct,
  acceptedExclusion,
  openingCartDetail,
  closingCartDetail,
  resetingCart,
  removeMultipleProduct,
  cartIconBadge,
  getDrawerTotalValue,
  verifyContent,
} from '../functions'

it('dashboard', () => {
  cy.visit('http://localhost:3000')
  searchingProducts('Criando meu primeiro teste.')
  clearInputSearch()
  searchingProducts('Small Cotton Shoes')
  addSearchProducts()
  clearInputSearch()
  searchingProducts('FrOzEn')
  addSearchProducts()
  clearInputSearch()
  cy.scrollTo('top')
  openingCartDetail()
  resetingCart()
  closingCartDetail()
  searchingProducts('Cotton')
  addSearchProducts()
  openingCartDetail()
  addMultipleProduct()
  addMultipleProduct()
  addMultipleProduct()
  removeMultipleProduct()
  removeMultipleProduct()
  resetingCart()
  closingCartDetail()
  clearInputSearch()
  searchingProducts('Small Cotton Shoes')
  addSearchProducts()
  openingCartDetail()
  addMultipleProduct()
  addMultipleProduct()
  addMultipleProduct()
  removeMultipleProduct()
  removeMultipleProduct()
  removeMultipleProduct()
  removeMultipleProduct()
  acceptedExclusion()
  closingCartDetail()
  clearInputSearch()
  verifyContent(cartIconBadge, '0')
})

export {}
