import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Post from 'App/Models/Post'

export default class Community extends BaseModel {
  @column({ isPrimary: true, columnName: 'id' })
  public id: number

  @column()
  public followers: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public color: string

  @column()
  public image_url: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @hasMany(() => Post, {
    foreignKey: 'community_id',
  })
  public posts: HasMany<typeof Post>
}
