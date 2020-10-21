import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Posts extends BaseSchema {
  protected tableName = 'posts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.integer('community_id').notNullable().references('id').inTable('communities').onDelete('CASCADE')
      table.string('title', 255).notNullable()
      table.string('image_url')
      table.string('content').notNullable()
      table.integer('likes').defaultTo(0)
      table.integer('unlikes').defaultTo(0)
      table.integer('comments').defaultTo(0)
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
