'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

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
