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

Route.group(() => {
  Route.get('/users', 'UsersController.index')
  Route.get('/logout' , 'AuthController.logout')
  Route.get('/checkToken' , 'AuthController.checkToken')
}).middleware('auth:api')

Route.get('/users/:user_id', 'UsersController.show')

Route.get('/communities', 'CommunitiesController.index')
Route.get('/communities/:community_id', 'CommunitiesController.show')
Route.post('/communities', 'CommunitiesController.store')
Route.delete('/communities/:community_id', 'CommunitiesController.delete')

Route.get('/posts', 'PostsController.index')
Route.get('/posts/:post_id', 'PostsController.show')
Route.post('/posts/:user_id/create/:community_id', 'PostsController.store')
Route.delete('/posts/:post_id', 'PostsController.delete')
