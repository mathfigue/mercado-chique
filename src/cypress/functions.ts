export const inputSearch = '[data-cy=input-search]'
export const addProductButton = '[data-cy=button-add-product]'
export const addOneButton = '[data-cy=button-add-one]'
export const removeOneButton = '[data-cy=button-remove-one]'
export const openCartDetail = '[data-cy=open-cart-detail'
export const cartDrawer = '[data-cy=drawer-cart]'
export const resetCartButton = '[data-cy=button-reset-cart]'
export const confirmRemovedProduct = '[data-cy=button-modal-confirm-exclusion]'
export const cancelRemovedProduct = '[data-cy=button-modal-cancel-exclusion]'
export const visitProductDetail = '[data-cy=link-to-product-details]'
export const returnDashboard = '[data-cy=button-back-dashboard]'
export const goToCart = '[data-cy=go-to-cart]'
export const inputValueCart = '[data-cy=input-change-value]'
export const cartCheckout = '[data-cy=button-cart-checkout]'
export const getDrawerTotalValue = '[data-cy=drawer-total-value]'

export const cartIconBadge = '[data-cy=cart-icon]'

export const searchingProducts = (text: string) => {
  cy.get(inputSearch).click()
  cy.focused().type(text)
  cy.get(inputSearch).should('have.value', text)
}

export const clearInputSearch = () => {
  cy.get(inputSearch).clear()
  cy.get(inputSearch).should('have.value', '')
}

export const addSearchProducts = () =>
  cy.get(addProductButton).click({ multiple: true })

export const openingCartDetail = () => cy.get(openCartDetail).click()

export const closingCartDetail = () => cy.get(cartDrawer).click(15, 40)

export const resetingCart = () => cy.get(resetCartButton).click()

export const addOneProduct = () =>
  cy.get(addOneButton).first().click({ waitForAnimations: true })

export const removeOneProduct = () =>
  cy.get(removeOneButton).first().click({ waitForAnimations: true })

export const addMultipleProduct = () =>
  cy.get(addOneButton).click({ multiple: true, waitForAnimations: true })

export const removeMultipleProduct = () =>
  cy.get(removeOneButton).click({ multiple: true, waitForAnimations: true })

export const acceptedExclusion = () => cy.get(confirmRemovedProduct).click()
export const cancelExclusion = () => cy.get(cancelRemovedProduct).click()

export const visitingProductDetails = () => cy.get(visitProductDetail).click()

export const addProductInDetail = () => cy.get(addProductButton).click()

export const returningDashboard = () => cy.get(returnDashboard).first().click()

export const goingToCart = () => cy.get(goToCart).click()

export const changeValueCart = (number: string) => {
  cy.get(inputValueCart).click()
  cy.focused().type(number)
}

export const doingCheckout = () => cy.get(cartCheckout).click()

export const verifyContent = (element: string, value: string | number) => {
  cy.get(element).contains(value)
}
