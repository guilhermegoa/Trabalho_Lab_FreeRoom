import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'

import User from 'App/Models/User'
import Community from 'App/Models/Community'
import Like from './Like'

export default class Post extends BaseModel {
  @column({ isPrimary: true, columnName: 'id' })
  public id: number

  @column()
  public user_id: number

  @column()
  public community_id: number

  @column()
  public title: string

  @column()
  public content: string

  @column()
  public likes: number
  
  @column()
  public unlikes: number

  @column()
  public comments: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => Community, {
    foreignKey: 'community_id',
  })
  public community: BelongsTo<typeof Community>

  @hasMany(() => Like, {
    foreignKey: 'post_id',
  })
  public likesArray: HasMany<typeof Like>
}
