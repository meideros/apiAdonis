'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/api/v1/register', 'UserController.register')
Route.post('/api/v1/login', 'UserController.login')
Route.get('/api/v1/me', 'UserController.currentUser').middleware('auth')
Route.get('/api/v1/users', 'UserController.getUsers').middleware('auth')
Route.resource('/api/v1/todos', 'TodoController').middleware('auth')

Route.get('/api/v1/logout', 'UserController.logout').middleware('auth')
