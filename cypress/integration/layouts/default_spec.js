describe('Default layout', () => {
  it('Before loading data', () => {
    cy.visit('/')
    cy.get('div.q-loading')
      .should('contain', 'Loading')
  })
})
