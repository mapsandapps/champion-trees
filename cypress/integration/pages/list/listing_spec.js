describe('Listing page', () => {

  it('Does not display filters upon page load', () => {
    cy.visit('/')

    cy.get('.q-layout-drawer').should('not.be.visible')
  })

  it('Displays filters when filters button is clicked', () => {
    cy.visit('/')

    cy.get('.filter-drawer-toggle').click()

    cy.get('.q-layout-drawer').should('be.visible')
  })
})
