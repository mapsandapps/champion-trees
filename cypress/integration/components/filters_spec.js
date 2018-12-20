import { loadMainPage, setTrees } from '../../support/utils.js'

describe('Filters Component', () => {
  beforeEach(loadMainPage)

  it('Begins by displaying all trees', () => {
    setTrees()
    cy.get('.filter-drawer-toggle').click()
    cy.get('.q-layout-drawer').contains(`Currently showing 4 of 4 trees`)
  })

  it('Does not display a filtering message when not filtering', () => {
    cy.get('.q-alert-content').should('not.be.visible')
  })

  it('Filters on search input', () => {
    cy.get('.filter-drawer-toggle').click()
    cy.get('.q-search input').type(`hickory`)
    cy.wait(300)
    cy.get('.list').should('not.contain', `Ironwood/Hornbeam`)
  })

  it('Displays a message that list is filtered when search is active', () => {
    cy.get('.filter-drawer-toggle').click()
    cy.get('.q-search input').type(`hickory{enter}`)
    cy.get('.q-alert-content').should('be.visible')
  })
})