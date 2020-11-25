import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeSave,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Post from 'App/Models/Post'
import Like from './Like'
import Community from './Community'
import Notifications from './Notification'

export default class User extends BaseModel {
  @column({ isPrimary: true, columnName: 'id' })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public name: string

  @column()
  public nick: string

  @column()
  public avatar: string

  @column({ columnName: 'bio' })
  public biografia: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(() => Post, {
    foreignKey: 'user_id',
  })
  public posts: HasMany<typeof Post>

  @hasMany(() => Like, {
    foreignKey: 'user_id',
  })
  public likesArray: HasMany<typeof Like>

  @hasMany(() => Notifications, {
    foreignKey: 'user_id',
  })
  public notifications: HasMany<typeof Notifications>

  @manyToMany(() => Community, {
    pivotTable: 'pivot_user_communities',
  })
  public user_community: ManyToMany<typeof Community>

  @manyToMany(() => Post, {
    pivotTable: 'post_alerts',
  })
  public postAlerts: ManyToMany<typeof Post>
}
