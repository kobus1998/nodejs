module.exports = (req, res, next) => {
  next(true, 'api auth')
}
