'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Marker = use('App/Models/Marker')

/**
 * Resourceful controller for interacting with markers
 */
class MarkerController {

  /**
   * @swagger
   * /markers:
   *   get:
   *     tags:
   *       - Markers
   *     summary: Get markers near a provided location.
   *     parameters:
   *       - in: body
   *         name: location
   *         description: Location where do you want to search for markers.
   *         schema:
   *           type: object
   *           required:
   *             - latitude
   *             - longitude
   *           properties:
   *             latitude:
   *               type: number
   *             longitude:
   *               type: number
   *     responses:
   *       200:
   *         description: Returns markers near a specific location.
   *         example:
   *            []
   */

  /**
   * Show a list of all markers near a given location.
   * GET markers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request }) {
    const { latitude, longitude } = request.all()

    const markers = Marker.query()
      .nearBy(latitude, longitude, 100)
      .fetch()

    return markers
  }

  /**
   * @swagger
   * /markers:
   *   post:
   *     tags:
   *       - Markers
   *     summary: Creates a new marker.
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: body
   *         name: marker
   *         description: The marker to create.
   *         schema:
   *           type: object
   *           required:
   *             - title
   *             - latitude
   *             - longitude
   *           properties:
   *             title:
   *               type: string
   *             description:
   *               type: string
   *             latitude:
   *               type: number
   *             longitude:
   *               type: number
   *             isPrivate:
   *               type: boolean
   *     responses:
   *       200:
   *         description: Returns the created marker
   *         example:
   *           title: My first Marker
   *           description: This is my very first marker
   *           latitude: -29.9372408
   *           longitude: -51.719269
   *           isPrivate: false
   *           created_at: 2021-04-27 20:24:55
   *           updated_at: 2021-04-27 20:24:55
   *           id: 1
   */

  /**
   * Create/save a new marker.
   * POST markers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    const data = request.only([
      'title',
      'description',
      'latitude',
      'longitude',
      'isPrivate'
    ])

    const marker = await Marker.create({ ...data })

    return marker
  }

  /**
   * @swagger
   * /markers/{id}:
   *   get:
   *     tags:
   *       - Markers
   *     summary: Get marker details.
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID of the marker.
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Returns marker details.
   *         example:
   *           id: 1
   *           title: My first Marker
   *           description: This is my very first marker
   *           latitude: -29.9372408
   *           longitude: -51.719269
   *           isprivate: 0
   *           created_at: 2021-04-27 20:24:55
   *           updated_at: 2021-04-27 20:24:55
   *           treasures: []
   */

  /**
   * Display a single marker.
   * GET markers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const marker = await Marker.findOrFail(params.id)

    const treasures = await marker
      .treasures()
      .with('user', (builder) => {
        builder.select('id', 'username', 'email')
      })
      .with('images')
      .fetch()

    marker.treasures = treasures

    return marker
  }

  /**
   * Update marker details.
   * PUT or PATCH markers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }
}

module.exports = MarkerController
