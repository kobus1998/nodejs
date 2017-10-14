module.exports = { // custom exceptions to catch the right error
  ExitLoop: function (msg) {
    this.msg = msg
    this.name = 'Exit loop'
  },
  PageNotFound: function (msg) {
    this.msg = msg
    this.name = 'Page not found'
  },
  NotAllowed: function (msg) {
    this.msg = msg
    this.name = 'Not allowed'
  },
  validationFailed: function (msg) {
    this.msg = msg
    this.name = 'Not allowed'
  }
}
