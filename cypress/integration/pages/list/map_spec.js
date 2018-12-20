import { loadMainPage } from '../../../support/utils.js'

describe('Map page', () => {
  beforeEach(loadMainPage)

  it('Displays tree info when map marker is clicked', () => {
    cy.get('.q-btn-toggle').click()
    cy.get('#map').find('.leaflet-marker-icon').first().click({ force: true }) // force: true because markers can be overlapping. we don't care which marker is clicked
    cy.get('#map-info').should('be.visible')
  })

  it('Navigates to tree details page when \'view details\' button clicked', () => {
    cy.get('.q-btn-toggle').click()
    cy.get('#map').find('.leaflet-marker-icon').first().click({ force: true }) // force: true because markers can be overlapping. we don't care which marker is clicked
    cy.get('#map-info').contains('View details').click()
    cy.url().should('contain', '/trees/0')
  })
})
