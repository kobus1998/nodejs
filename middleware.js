const middleware = require('./config/middleware')
const PolicyIndex = require('./policies')
const Exceptions = require('./exceptions')

module.exports = async function (req, res, controller, action) {
  if (typeof middleware[controller] === 'undefined') middleware[controller] = []

  let allPolicies = middleware['all'] || []
  let controllerPolicies = middleware[controller]['all'] || []
  let actionPolicies = middleware[controller][action] || []

  // all policies of route
  let Policies = [
    allPolicies,
    controllerPolicies,
    actionPolicies
  ]
  // async function, controller gets executed after middleware
  let failed = []
  // map through policies
  Policies.forEach(policies => {
    policies.forEach(policy => {
      PolicyIndex[policy](req, res, (state = false, msg = '') => {
        if (state === false) failed.push(msg)
      })
    })
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