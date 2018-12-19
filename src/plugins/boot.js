// import something here

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do

  if (window.Cypress) {
    window.app = new Vue(app)
  } else {
    (() => new Vue(app))()
  }
}
