'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** 
*  @swagger
*  definitions:
*    Treasure:
*      type: object
*      properties:
*        id:
*          type: uint
*        user_id:
*          type: uint
*        marker_id:
*          type: uint
*        title:
*          type: string
*        description:
*          type: string
*        created_at:
*          type: string
*        updated_at:
*          type: string
*        images:
*          type: array
*      required:
*        - user_id
*        - marker_id
*        - title
*/
class Treasure extends Model {
    user() {
        return this.belongsTo('App/Models/User')
    }

    marker() {
        return this.belongsTo('App/Models/Marker')
    }

    images() {
        return this.hasMany('App/Models/Image')
    }
}

module.exports = Treasure
