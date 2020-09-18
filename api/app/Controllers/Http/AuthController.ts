import User from '../../Models/User'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
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

  public async login ({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    let token
    try {
      token = await auth.use('api')
        .attempt(email, password, {expiresIn: '1 days'})
    } catch (error) {
      throw new Error('Aconteceu algun erro ao tentar logar.Tente novamente!!')
    }

    return token.toJSON()
  }

  public async logout ({ auth, response }: HttpContextContract) {
    try {
      await auth.use('api').logout()
    } catch (error) {
      throw new Error('Error ao tentar deslogar')
    }

    response.json('Saiu com sucesso')
  }
}
