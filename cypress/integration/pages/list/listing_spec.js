import { loadMainPage, setTrees } from '../../../support/utils.js'

describe('Listing page', () => {
  beforeEach(loadMainPage)

  it('Does not display filters upon page load', () => {
    cy.get('.q-layout-drawer').should('not.be.visible')
  })

  it('Displays filters when filters button is clicked', () => {
    cy.get('.filter-drawer-toggle').click()

    cy.get('.q-layout-drawer').should('be.visible')
  })

  it('Displays list on load', () => {
    setTrees()
    cy.get('.list').find('.q-item').should('have.length', 4)
  })

  it('Displays map in map mode', () => {
    cy.get('.q-btn-toggle').click()
    cy.get('#map').should('be.visible')
  })
})
