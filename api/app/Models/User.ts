import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeSave,
  column,
  HasMany,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Post from 'App/Models/Post'
import Like from './Like'

export default class User extends BaseModel {
  @column({ isPrimary: true, columnName: 'id' })
  public id: number

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public name: string

  @column()
  public nick: string

  @column()
  public avatar: string

  @column({ columnName: 'bio' })
  public biografio: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
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

  static get hidden() {
    return ['password']
  }
}
