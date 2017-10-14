module.exports = {
  send404: (req, res, msg) => {
    res.statusCode = 404
    res.end(JSON.stringify({ msg, err: '404: not found' }))
  },
  send403: (req, res, msg) => {
    res.statusCode = 403
    res.end(JSON.stringify({ msg, err: '403: not allowed' }))
  },
  send402: (req, res, msg) => {
    res.statusCode = 402
    res.end(JSON.stringify({ msg, err: '402: validation failed' }))
  }
}
