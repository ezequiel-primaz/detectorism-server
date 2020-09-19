'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TreasureSchema extends Schema {
  up() {
    this.create('treasures', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('marker_id')
        .unsigned()
        .references('id')
        .inTable('markers')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('title').notNullable()
      table.string('description')
      table.timestamps()
    })
  }

  down() {
    this.drop('treasures')
  }
}

module.exports = TreasureSchema
