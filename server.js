const http = require('http')
const ServerConfig = require('./config/server')
const requestHandler = require('./requestHandler')
const UrlParser = require('url')

const server = http.createServer((req, res) => {
  const { headers, method, url } = req
  let body = []

  let params = UrlParser.parse(req.url).search
  params = params.split('&')
  params[0] = params[0].substr(1)

  let param = {}

  params.map(e => {
    e = e.split('=')
    param[e[0]] = e[1]
  })

  req.on('error', err => {
    requestHandler.error(err)
  })

  req.on('data', chunk => {
    body.push(chunk)
  })

  req.on('end', () => {
    body = Buffer.concat(body).toString()
  })

  res.on('error', (err) => {
    console.error(err)
  })

  req.on('request', (req, res) => {
    requestHandler.request(req, res)
  })

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  // let queries = urlParsed
  const responseBody = { headers, method, url, body, param }

  res.write(JSON.stringify(responseBody))
  res.end()
})

server.listen(ServerConfig.general.port, ServerConfig.general.host, () => {
  console.log(`Listening to port ${ServerConfig.general.port} on ${ServerConfig.general.host}`)
})
