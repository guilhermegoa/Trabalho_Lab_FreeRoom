import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    let token
    try {
      token = await auth
        .use('api')
        .attempt(email, password, { expiresIn: '1 days' })
        .then((data) => data.token)
    } catch (error) {
      throw new Error('Aconteceu algun erro ao tentar logar.Tente novamente!!')
    }

    return token
  }

  public async logout({ auth, response }: HttpContextContract) {
    try {
      await auth.use('api').logout()
    } catch (error) {
      throw new Error('Error ao tentar deslogar')
    }

    response.status(200)
  }

  public async checkToken({ auth }: HttpContextContract) {
    return auth.check()
  }

  public async retriveUserByToken({ auth, response }: HttpContextContract) {
    const user_id = auth.user?.id
    if (!user_id) return response.status(404).json('User id not found')

    const user = await User.query()
      .where('id', user_id)
      .preload('user_community', (query) => query.select('id'))
      .preload('posts')
      .preload('likesArray')
      .preload('notifications')
      .preload('postAlerts')
      .first()

    if (!user) return response.status(404).json('User not found')

    const { password, ...userJSON } = user.toJSON()

    userJSON.likesArray = user.likesArray.map(({ post_id, is_like }) => ({
      post_id,
      is_like,
    }))

    userJSON.user_community = userJSON.user_community
      .map((id) => Object.values(id))
      .flat()

    userJSON.user_community = [...new Set(userJSON.user_community)]

    userJSON.postAlerts = userJSON.postAlerts.map((item) => item.id)

    return response.json(userJSON)
  }
}
