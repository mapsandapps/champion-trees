export const loadMainPage = () => {
  cy.visit('/')
  cy.window().should('have.property', 'dataLoaded', true)
}

export const setTrees = () => {
  cy.window().should('have.property', 'dataLoaded', true)

  const getStore = () => cy.window().its('app.$store')

  getStore().then(store => {
    cy.fixture('trees.json').then(trees => {
      store.dispatch('trees/setTreeData', trees)
    })
  })
}
