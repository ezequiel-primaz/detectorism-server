'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MarkerSchema extends Schema {
  up() {
    this.create('markers', (table) => {
      table.increments()
      table.string('title').notNullable()
      table.string('description')
      table.decimal('latitude', 10, 8).notNullable()
      table.decimal('longitude', 10, 8).notNullable()
      table.boolean('isprivate').notNullable().defaultTo(true)
      table.timestamps()
    })
  }

  down() {
    this.drop('markers')
  }
}

module.exports = MarkerSchema
