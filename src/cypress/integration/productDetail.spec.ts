import {
  searchingProducts,
  addSearchProducts,
  visitingProductDetails,
  addOneProduct,
  removeOneProduct,
  acceptedExclusion,
  cancelExclusion,
  addProductInDetail,
  returningDashboard,
  verifyContent,
  cartIconBadge,
} from '../functions'

it('product details', () => {
  cy.visit('http://localhost:3000')
  searchingProducts('Small Cotton Shoes')
  addSearchProducts()
  visitingProductDetails()
  cy.get('[data-cy=button-add-one]').should('be.visible')
  cy.get('[data-cy=button-remove-one]').should('be.visible')
  removeOneProduct()
  cancelExclusion()
  addOneProduct()
  addOneProduct()
  removeOneProduct()
  removeOneProduct()
  removeOneProduct()
  acceptedExclusion()
  addProductInDetail()
  addOneProduct()
  addOneProduct()
  returningDashboard()
  verifyContent(cartIconBadge, '3')
})

export {}
