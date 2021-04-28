'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

/** 
*  @swagger
*  definitions:
*    Marker:
*      type: object
*      properties:
*        id:
*          type: uint
*        title:
*          type: string
*        description:
*          type: string
*        latitude:
*          type: number
*        longitude:
*          type: number
*        isPrivate:
*          type: boolean
*        treasures:
*          type: array
*      required:
*        - title
*        - latitude
*        - longitude
*/
class Marker extends Model {

    static scopeNearBy(query, latitude, longitude, distance) {
        const haversine = `(6371 * acos(cos(radians(${latitude}))
            * cos(radians(latitude))
            * cos(radians(longitude)
            - radians(${longitude}))
            + sin(radians(${latitude}))
            * sin(radians(latitude))))`

        return query
            .select('*', Database.raw(`round(${haversine}) as distance`))
            .whereRaw(`${haversine} < ${distance}`)
    }

    treasures() {
        return this.hasMany('App/Models/Treasure')
    }
}

module.exports = Marker
