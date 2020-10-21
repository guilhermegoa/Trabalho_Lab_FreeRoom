import Post from 'App/Models/Post'
import User from 'App/Models/User'
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'

export default class Like extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public is_like: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public post_id: number

  @column()
  public user_id: number

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => Post, {
    foreignKey: 'post_id',
  })
  public post: BelongsTo<typeof Post>
}
