const routes = require('./config/routes')
const controllers = require('./controllers')
const AppController = require('./controllers/AppController')
const Exceptions = require('./exceptions')
const middleware = require('./middleware')

module.exports = async (req, res) => {
  let itemsProcessed = 0 // count how many loops done
  let pageHasBeenFound = false

  if (req.url.charAt(req.url.length - 1) === '/') {
    req.url = req.url.substr(0, req.url.length - 1)
  }

  let receivedParams = req.url.split('/')
  receivedParams.splice(0, 1)

  routes.forEach((route, i) => {
    route = route.split(' ') // split the string on space

    let method = route[0]
    let url = route[1]
    let controlAction = route[2].split('@') // split the string on @'s
    let controller = controlAction[0] // controller name
    let action = controlAction[1] // action name

    let urlParams = url.split('/')
    urlParams.splice(0, 1)
    let params = []

    async function createParams () {
      urlParams.forEach((part, index) => {
        if (part.charAt(0) === ':') {
          params.push({ optional: true, name: part })
        } else {
          params.push({ optional: false, name: part })
        }
      })
    }

    let found = false

    async function validateParams () {
      let checked = []
      async function checkAllParams () {
        params.forEach((param, index) => {
          if (param.optional === false) {
            if (param.name === receivedParams[index]) {
              checked.push(true)
            } else {
              checked.push(false)
            }
          } else {
            checked.push(true)
          }
        })
      }
      checkAllParams().then(_ => {
        if (checked.every(x => x === true) && params.length === receivedParams.length) {
          found = true
        }
      })
    }

    if (!pageHasBeenFound) {
      createParams().then(_ => {
        validateParams().then(_ => {
          itemsProcessed++
          if (found && req.method === method) {
            pageHasBeenFound = true
            req.params = {}
            params.forEach((param, index) => {
              if (param.optional === true) {
                param.name = param.name.substring(1)
                req.params[param.name] = receivedParams[index]
              }
            })
            middleware(req, res, controller, action).then(_ => {
              controllers[controller][action](req, res)
            }).catch(e => {
              console.log(e)
              if (e instanceof Exceptions.NotAllowed) {
                AppController.send403(req, res, e.msg)
              }
            })
          } else {
            console.log(itemsProcessed)
            if (itemsProcessed === routes.length && !pageHasBeenFound) {
              AppController.send404(req, res, 'Page not found')
            }
          }
        })
      })
    }
  })
}
