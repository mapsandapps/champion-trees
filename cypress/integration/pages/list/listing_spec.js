const visit = () => cy.visit('/')

describe('Listing page', () => {
  beforeEach(visit)

  it('Does not display filters upon page load', () => {
    cy.get('.q-layout-drawer').should('not.be.visible')
  })

  it('Displays filters when filters button is clicked', () => {
    cy.get('.filter-drawer-toggle').click()

    cy.get('.q-layout-drawer').should('be.visible')
  })
})
