import User from '../../Models/User'

export default class UsersController {
  public async index () {
    const users = await User.query()
      .select(['id','email', 'created_at','updated_at'])

    return users
  }
}
