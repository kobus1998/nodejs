const routes = require('./config/routes')
const controllers = require('./controllers')
const AppController = require('./controllers/AppController')
const Exceptions = require('./exceptions')
const middleware = require('./config/middleware')
const PolicyIndex = require('./policies')

module.exports = async (req, res) => {
  let itemsProcessed = 0 // count how many loops done
  routes.map((route, i) => {
    itemsProcessed++
    route = route.split(' ') // split the strin on space

    let method = route[0]
    let url = route[1]
    let controlAction = route[2].split('@') // split the string on @'s
    let controller = controlAction[0] // controller name
    let action = controlAction[1] // action name

    if (url === req.url && method === req.method) {
      // all policies of route
      const Policies = [
        middleware['all'],
        middleware[controller]['all'],
        middleware[controller][action]
      ]
      // async function, controller gets executed after middleware
      async function executeMiddleware () {
        let failed = []
        // map through policies
        Policies.map(policies => {
          if (typeof policies !== 'undefined') {
            if (policies.length > 0) {
              policies.map(policy => {
                // execute policy
                PolicyIndex[policy](req, res, (state = false, msg = '') => {
                  if (state === false) failed.push(msg)
                })
              })
            }
          }
        })
        // send multiple
        if (failed.length > 0) {
          if (failed.length === 1) {
            // simple string if only 1 failed
            throw new Exceptions.NotAllowed(failed[0])
          } else {
            // array of multiple failed
            throw new Exceptions.NotAllowed(failed)
          }
        }
      }

      executeMiddleware().then(_ => {
        // if all middleware is true
        controllers[controller][action](req, res) // execute the controller action
      }).catch(e => {
        // if middleware failed
        if (e instanceof Exceptions.NotAllowed) {
          AppController.send403(req, res, e.msg)
        }
      })

      throw new Exceptions.ExitLoop('Route is found') // exit the loop
    }
    if (itemsProcessed === routes.length) { //  if last loop
      throw new Exceptions.PageNotFound(req, res) // page is not found
    }
  })
}
