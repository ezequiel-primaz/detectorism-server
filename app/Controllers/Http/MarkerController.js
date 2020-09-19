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
   * Show a list of all markers.
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
      .nearBy(latitude, longitude, 10)
      .fetch()

    return markers
  }

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
      'longitude'
    ])

    const marker = await Marker.create({ ...data })

    return marker
  }

  /**
   * Display a single marker.
   * GET markers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const marker = await Marker.findOrFail(params.id)

    await marker.load('treasures')

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
