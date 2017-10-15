const http = require('http')
const ServerConfig = require('./config/server')
const helpers = require('./helpers')
const AppController = require('./controllers/AppController')
const router = require('./router')
const Exceptions = require('./exceptions')

const server = http.createServer()

server.on('request', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  helpers.parseBody(req, res, (body) => {
    req.body = body
    router(req, res).catch(e => {
      if (e instanceof Exceptions.ExitLoop) console.log('FOUND!')
      if (e instanceof Exceptions.PageNotFound) AppController.send404(req, res, 'Page not found')
    })
  })
  req.on('error', err => console.log(err))
})

server.listen(ServerConfig.general.port, ServerConfig.general.host, () => {
  console.log(`Listening to port ${ServerConfig.general.port} on ${ServerConfig.general.host}`)
})
