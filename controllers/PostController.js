module.exports = {
  index (req, res) {
    console.log('index')
    res.statusCode = 200
    res.write(JSON.stringify({ page: '/post' }))
    res.end()
  },
  show (req, res) {
    console.log('show')
    res.statusCode = 200
    res.write(JSON.stringify({ page: '/post/show' }))
    res.end()
  },
  store (req, res) {
    console.log('store')
    res.statusCode = 201
    res.write(JSON.stringify(req.body))
    res.end()
  }
}
