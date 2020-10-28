/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('/register', 'UsersController.register')
Route.post('/login', 'AuthController.login')

Route.get('/communities', 'CommunitiesController.index')
Route.get('/communities/:community_id', 'CommunitiesController.show')

//Route.get('/posts/:post_id', 'PostsController.show')
Route.get('/recentposts', 'PostsController.recentPosts')

Route.group(() => {
  Route.get('/users', 'UsersController.index')
  Route.get('/logout', 'AuthController.logout')
  Route.get('/checktoken', 'AuthController.checkToken')
  Route.get('/retriveuser', 'AuthController.retriveUserByToken')


  Route.get('/users/:user_id', 'UsersController.show')

  Route.post('/followcommunity', 'UsersController.followCommunity')
  Route.post('/unfollowcommunity', 'UsersController.unfollowCommunity')

  // Route.post('/communities', 'CommunitiesController.store')
  // Route.delete('/communities/:community_id', 'CommunitiesController.delete')

  // Route.get('/posts', 'PostsController.index')
  // Route.delete('/posts/:post_id', 'PostsController.delete')

  Route.get('/posts/:post_id', 'PostsController.show')
  Route.post('/posts/:user_id/create/:community_id', 'PostsController.store')
  Route.delete('/posts/:post_id', 'PostsController.delete')
}).middleware('auth:api')

Route.get('/search/posts/:search?', 'PostsController.index')


Route.get('/likes/post/:post_id', 'LikesController.retriveByPost')
Route.get('/likes/user/:user_id', 'LikesController.retriveByUser')
Route.get(
  '/likes/user/:user_id/post/:post_id',
  'LikesController.retriveByPostAndUser'
)
Route.get('/likes', 'LikesController.retriveAll')
Route.post('/likes', 'LikesController.create')
Route.delete('/likes/user/:user_id/post/:post_id', 'LikesController.delete')

Route.get('/comments/post/:post_id', 'CommentsController.retriveByPost')
Route.get('/comments/user/:user_id', 'CommentsController.retriveByUser')
Route.get(
  '/comments/user/:user_id/post/:post_id',
  'CommentsController.retriveByPostAndUser'
)
Route.get('/comments', 'CommentsController.retriveAll')
Route.post('/comments', 'CommentsController.create')
Route.delete('/comments/:id', 'CommentsController.delete')

