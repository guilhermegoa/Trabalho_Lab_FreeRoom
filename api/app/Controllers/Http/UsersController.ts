import User from '../../Models/User'
import Community from '../../Models/Community'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async register({ request, response }: HttpContextContract) {
    /**
     * Validate user details
     */
    const validationSchema = schema.create({
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email' }),
      ]),
      password: schema.string({ trim: true }, [rules.confirmed()]),
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

  public async index() {
    const users = await User.query().select([
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

  public async show({ params }: HttpContextContract) {
    const { user_id } = params
    const user = User.query()
      .where('id', user_id)
      .preload('posts')
      .preload('likesArray')
    return user
  }

  public async followCommunity({ request, response }: HttpContextContract) {
    const  user_id = request.input('user_id')
    const community_id = request.input('community_id')
    
    try {
        const user = await User.find(user_id)
        const community = await Community.find(community_id)
      
        if(community === null){
          return response.status(400).json('Community id not found')
        }

        await user?.related('user_community').attach([community.id])

        return response.status(200)
    } catch (error) {
      response.status(500).json(error.messsage)
    }
  }

  public async unfollowCommunity({ request, response }: HttpContextContract) {
    const  user_id = request.input('user_id')
    const community_id = request.input('community_id')
    
    try {
        const user = await User.find(user_id)
        const community = await Community.find(community_id)

        if(community === null){
          return response.status(400).json('Community id not found')
        }

        await user?.related('user_community').detach([community.id])

        return response.status(200)
    } catch (error) {
      response.status(500).json(error.messsage)
    }
  }
}
