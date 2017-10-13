module.exports = {
  index (req, res) {
    let users = [
      { name: 'user' },
      { name: 'haha' },
      { name: 'very good!' }
    ]
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify(users))
    res.end()
  },
  show (req, res) {
    console.log('user show')
  },
  store (req, res) {
    let body = []
    req.on('error', (err) => {
      console.error(err)
    }).on('data', (chunk) => {
      body.push(chunk)
    }).on('end', () => {
      body = Buffer.concat(body).toString()
      res.statusCode = 201
      res.write(body)
      res.end()
    })
  }
}
