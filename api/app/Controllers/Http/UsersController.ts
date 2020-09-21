import User from '../../Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async register ({ request, response }: HttpContextContract) {
    /**
     * Validate user details
     */
    const validationSchema = schema.create({
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email' }),
      ]),
      password: schema.string({ trim: true }, [
        rules.confirmed(),
      ]),
    })

    let userDetails
    try {
      userDetails = await request.validate({
        schema: validationSchema,
      })
    } catch (error) {
      throw new Error('Dados para criação errados.')
    }

    /**
     * Create a new user
     */
    const user = new User()
    user.email = userDetails.email
    user.password = userDetails.password
    user.name = request.input('name')

    try {
      await user.save()
    } catch (error) {
      throw new Error('Ocorreu algum problema ao salvar o usuário')
    }

    response.json('Usuário criado com sucesso!!')
  }

  public async index () {
    const users = await User.query()
      .select([
        'id',
        'email',
        'name',
        'nick',
        'avatar',
        'bio',
        'created_at',
        'updated_at',
      ])

    return users
  }
}
