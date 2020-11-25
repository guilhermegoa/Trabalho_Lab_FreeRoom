import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PostAlerts extends BaseSchema {
  protected tableName = 'post_alerts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table
        .integer('post_id')
        .notNullable()
        .references('id')
        .inTable('posts')
        .onDelete('CASCADE')
      table.primary(['user_id', 'post_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
