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

Route.post('/users', 'UserController.create')
Route.get('/users/:id', 'UserController.show')
Route.post('/sessions', 'SessionController.create')
Route.post('/treasures/:id/images', 'ImageController.store')
  .middleware('auth')
Route.resource('treasures', 'TreasureController')
  .apiOnly()
  .middleware('auth')
Route.get('/markers', 'MarkerController.index')
Route.post('/markers', 'MarkerController.store')
Route.get('/markers/:id', 'MarkerController.show')
Route.get('/images/:path', 'ImageController.show')
Route.get('/privacy', ({ view }) => {
  return view.render('privacy')
})
