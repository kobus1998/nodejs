module.exports = {
  index (req, res) {
    let users = [
      { name: 'user' },
      { name: 'haha' },
      { name: 'very good!' }
    ]
    res.statusCode = 200
    res.write(JSON.stringify(users))
    res.end()
  },
  show (req, res) {
    console.log('user show')
  },
  store (req, res) {
    res.statusCode = 201
    res.write(JSON.stringify(req.body))
    res.end()
  }
}
