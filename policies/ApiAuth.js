module.exports = (req, res, next) => {
  console.log(req.params)
  next(true, 'api auth')
}
