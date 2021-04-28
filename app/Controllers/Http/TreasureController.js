'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Treasure = use('App/Models/Treasure')

/**
 * Resourceful controller for interacting with treasures
 */
class TreasureController {
  /**
   * Show a list of all treasures.
   * GET treasures
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const treasures = Treasure.query()
      .with('images')
      .fetch()

    return treasures
  }

  /**
   * Create/save a new treasure.
   * POST treasures
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ auth, request }) {
    const { id } = auth.user
    const data = request.only([
      'title',
      'description',
      'marker_id'
    ])

    const treasure = await Treasure.create({ ...data, user_id: id })

    return treasure
  }


  /**
   * @swagger
   * /treasures/{id}:
   *   get:
   *     tags:
   *       - Treasures
   *     security:
   *       - bearerAuth: []
   *     summary: Get treasure details.
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID of the treasure.
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Returns treasure details.
   *         example:
   *           id: 1,
   *           user_id: 1
   *           marker_id: 1
   *           title: This is a wonderful object.
   *           description: What nice coin.
   *           created_at: 2021-04-27 20:48:08
   *           updated_at: 2021-04-27 20:48:08
   *           images: []
   */

  /**
   * Display a single treasure.
   * GET treasures/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const treasure = await Treasure.findOrFail(params.id)

    await treasure.load('images')

    return treasure
  }

  /**
   * Update treasure details.
   * PUT or PATCH treasures/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    const treasure = await Treasure.findOrFail(params.id)
    const data = request.only([
      'title',
      'description'
    ])

    treasure.merge(data)
    await treasure.save()

    return treasure
  }

  /**
   * Delete a treasure with id.
   * DELETE treasures/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {

    const treasure = await Treasure.findOrFail(params.id)

    if (treasure.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }
  
    await treasure.delete()

  }
}

module.exports = TreasureController
