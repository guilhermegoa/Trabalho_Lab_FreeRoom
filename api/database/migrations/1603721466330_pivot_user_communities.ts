import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PivotUserCommunities extends BaseSchema {
  protected tableName = 'pivot_user_communities'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table
        .integer('community_id')
        .notNullable()
        .references('id')
        .inTable('communities')
        .onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
