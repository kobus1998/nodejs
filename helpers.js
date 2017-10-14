const helpers = module.exports = {
  parseBody (req, res, cb) { // parse incomming data
    let body = []
    req.on('data', (chunk) => {
      body.push(chunk)
    }).on('end', () => {
      body = Buffer.concat(body).toString()
      body = helpers.stringToJson(body)
      cb(body)
    })
  },
  stringToJson (str) { // querystring to json / object
    let result = {}
    let objs = str.split('&')
    objs.map(obj => {
      let item = obj.split('=')
      result[item[0]] = item[1]
    })

    return result
  }
}
