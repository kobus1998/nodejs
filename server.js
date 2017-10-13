const http = require('http')
const ServerConfig = require('./config/server')
const routes = require('./routes')
const controllers = require('./controllers')

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/x-www-form-urlencoded')
  routes.map((route, i) => {
    route = route.split(' ')
    let method = route[0]
    let url = route[1]
    let controlAction = route[2].split('@')
    let controller = controlAction[0]
    let action = controlAction[1]
    if (url === req.url && method === req.method) {
      controllers[controller][action](req, res)
    } else {
      return false
    }
  })
})

server.listen(ServerConfig.general.port, ServerConfig.general.host, () => {
  console.log(`Listening to port ${ServerConfig.general.port} on ${ServerConfig.general.host}`)
})
