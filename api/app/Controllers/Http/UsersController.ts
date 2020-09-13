import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'

export default class UsersController {
  public async index () {
    const users = await User.all()

    return users
  }

  public async store ({request}: HttpContextContract) {
    const data = request.only(['email' , 'password'])

    const user = await User.create(data)

    user.save()
    console.log(user.$isPersisted)
  }
}
