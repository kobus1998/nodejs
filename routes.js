module.exports = [
  'GET /user UserController@index',
  'POST /user UserController@store',
  'GET /user/{userId} UserController@show',
  'GET /post PostController@index',
  'GET /post/{postId} PostController@show'
]
