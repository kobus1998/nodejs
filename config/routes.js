module.exports = [ // method url controller@action
  'GET /user UserController@index',
  'POST /user UserController@store',
  'GET /user/:userId UserController@show',
  'GET /post PostController@index',
  'POST /post PostController@store',
  'GET /post/:postId PostController@show',
  'GET /404 AppController@failed'
]
