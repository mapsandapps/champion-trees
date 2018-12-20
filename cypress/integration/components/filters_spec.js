import { loadMainPage, setTrees } from '../../support/utils.js'

describe('Filters Component', () => {
  beforeEach(loadMainPage)

  it('Begins by displaying all trees', () => {
    setTrees()
    cy.get('.filter-drawer-toggle').click()
    cy.get('.q-layout-drawer').contains('Currently showing 4 of 4 trees')
  })

  it('Does not display a filtering message when not filtering', () => {
    cy.get('.q-alert-content').should('not.be.visible')
  })

  it('Filters on search input', () => {
    cy.get('.filter-drawer-toggle').click()
    cy.get('.q-search input').type('hickory')
    cy.wait(300)
    cy.get('.list').should('not.contain', 'Ironwood/Hornbeam')
  })

  it('Displays a message that list is filtered when search is active', () => {
    cy.get('.filter-drawer-toggle').click()
    cy.get('.q-search input').type(`hickory{enter}`)
    cy.get('.q-alert-content').should('be.visible')
  })

  it('Filters by species', () => {
    setTrees()
    cy.get('.filter-drawer-toggle').click()
    cy.get('.q-option').contains('Dogwood').click()
    cy.wait(300)
    cy.get('.list').should('not.contain', 'Dogwood')
  })

  it('Filters by both search and species', () => {
    setTrees()
    cy.get('.filter-drawer-toggle').click()
    cy.get('.q-search input').type('pignut')
    cy.get('.q-option').contains('Dogwood').click()
    cy.wait(300)
    cy.get('.list').should('not.contain', 'Dogwood')
    cy.get('.list').should('not.contain', 'Bitternut')
    cy.get('.list').should('contain', 'Pignut')
  })

  it('Resets filters', () => {
    setTrees()
    cy.get('.filter-drawer-toggle').click()
    cy.get('.q-search input').type('pignut')
    cy.get('.q-option').contains('Dogwood').click()
    cy.wait(300)
    cy.get('.q-btn').contains('Reset filters').click()
    cy.get('.list').should('contain', 'Dogwood')
    cy.get('.list').should('contain', 'Bitternut')
  })
})
