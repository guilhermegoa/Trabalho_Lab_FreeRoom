import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Community from 'App/Models/Community'

export default class CommunitiesController {
  public async index() {
    return Community.all()
  }

  public async show({ params }: HttpContextContract) {
    const { community_id } = params
    const community = await Community.query()
      .where('id', community_id)
      .preload('posts', (query) => {
        query
          .preload('user', (query) => query.select('id', 'name', 'avatar'))
          .preload('likesArray')
          .preload('commentsArray', (query) => {
            query.preload('user')
          })
      })

    return community
  }

  public async store({ request, response }: HttpContextContract) {
    const community = new Community()
    const data = request.only(['name'])

    community.name = data.name
    try {
      await community.save()
    } catch (error) {
      throw new Error('Ocorreu algum erro ao criar a comunidade')
    }

    response.json('Comunidade criada com sucesso')
  }

  public async delete({ params }: HttpContextContract) {
    const { community_id } = params
    const community = await Community.findOrFail(community_id)
    await community.delete()
  }
}
