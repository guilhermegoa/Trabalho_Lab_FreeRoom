import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Communities extends BaseSchema {
  protected tableName = 'communities'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.integer('followers').defaultTo(0)
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
