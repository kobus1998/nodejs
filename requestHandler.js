module.exports = {
  request: (req, res) => {
    console.log(req.url)
    switch (req.url) {
      case '/':
        console.log('home')
        break
      case '/user':
        console.log('user')
        break
      case '/post':
        console.log('post')
        break
      default:
    }
  },
  error: err => { throw err },
  data: (chunk) => {},
  end: () => {}
}
