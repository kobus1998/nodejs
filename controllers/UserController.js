module.exports = {
  index (req, res) {
    console.log('indexx')
    res.statusCode = 200
    res.write(JSON.stringify({page: '/user'}))
    res.end()
  },
  show (req, res) {
    res.statusCode = 200
    res.write(JSON.stringify({page: '/user/show'}))
    res.end()
  },
  store (req, res) {
    res.statusCode = 201
    res.write(JSON.stringify(req.body))
    res.end()
  }
}
