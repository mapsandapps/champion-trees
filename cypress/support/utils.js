const trees = [
  {
    "ID": "0",
    "Rank": "1",
    "YEAR": "2016",
    "measured?": "",
    "SPECIES": "Carpinus caroliniana",
    "COMMON NAME": "Ironwood/Hornbeam",
    "LOCATION": "Fernbank Forest",
    "CIR (ft)": "2.8",
    "CIR (in)": "33.0",
    "HEIGHT(ft)": "60.8",
    "SPREAD (ft)": "39.0",
    "Points": "103.6",
    "Latitude": "33.776997",
    "Longitude": "-84.322313",
    "Precision (1-4)": "1",
    "Location Type": "Public Access",
    "State Champion": ""
  },
  {
    "ID": "1",
    "Rank": "2",
    "YEAR": "2017",
    "measured?": "",
    "SPECIES": "Carya cordiformis",
    "COMMON NAME": "Hickory - Bitternut",
    "LOCATION": "Fernbank Forest, below pond",
    "CIR (ft)": "6.5",
    "CIR (in)": "77.5",
    "HEIGHT(ft)": "127.7",
    "SPREAD (ft)": "45.0",
    "Points": "216.5",
    "Latitude": "33.776875",
    "Longitude": "-84.322458",
    "Precision (1-4)": "3",
    "Location Type": "Public Access",
    "State Champion": ""
  },
  {
    "ID": "2",
    "Rank": "1",
    "YEAR": "2010",
    "measured?": "",
    "SPECIES": "Carya glabra",
    "COMMON NAME": "Hickory - Pignut",
    "LOCATION": "Fernbank Forest",
    "CIR (ft)": "8.1",
    "CIR (in)": "97.6",
    "HEIGHT(ft)": "141.6",
    "SPREAD (ft)": "57.0",
    "Points": "253.4",
    "Latitude": "33.77645",
    "Longitude": "-84.321728",
    "Precision (1-4)": "1",
    "Location Type": "Public Access",
    "State Champion": ""
  },
  {
    "ID": "3",
    "Rank": "3",
    "YEAR": "2018",
    "measured?": "",
    "SPECIES": "Cornus alternifolia",
    "COMMON NAME": "Dogwood - Alternate leaf",
    "LOCATION": "Fernbank Forest - new access trail",
    "CIR (ft)": "0.8",
    "CIR (in)": "9.0",
    "HEIGHT(ft)": "16.6",
    "SPREAD (ft)": "19.5",
    "Points": "30.5",
    "Latitude": "33.77651",
    "Longitude": "-84.324074",
    "Precision (1-4)": "4",
    "Location Type": "Public Access",
    "State Champion": ""
  }
]

export const loadMainPage = () => {
  cy.visit('/')
  cy.window().should('have.property', 'dataLoaded', true)
}

export const setTrees = () => {
  cy.window().should('have.property', 'dataLoaded', true)

  const getStore = () => cy.window().its('app.$store')

  getStore().then(store => {
    store.dispatch('trees/setTreeData', trees)
  })
}