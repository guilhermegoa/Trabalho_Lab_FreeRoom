// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Post from 'App/Models/Post'
import User from 'App/Models/User'
import Community from 'App/Models/Community'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PostsController {
  public async index() {
    return Post.all()
  }

  public async show({ params }: HttpContextContract) {
    const { post_id } = params
    const post = await Post.query()
      .where('id', post_id)
      .preload('community')
      .preload('user')
      .preload('commentsArray')

    return post
  }

  public async store({ params, request, response }: HttpContextContract) {

    const data = request.only(['title', 'content', 'image_url'])

    const { user_id, community_id } = params

    const user = await User.find(user_id)
    if (!user) {
      throw new Error('Não existe o usuário')
    }
    const community = await Community.find(community_id)
    if (!community) {
      throw new Error('Não existe a comunidade')
    }

    const post = new Post()
    post.title = data.title
    post.content = data.content
    post.community_id = community_id
    post.user_id = user_id
    post.image_url = data.image_url

    try {
      await post.related('user').associate(user)
      await post.related('community').associate(community)
    } catch (error) {
      throw new Error('Ocorreu algum erro ao criar o post')
    }

    response.json('Post publicado com sucesso')
  }

  public async delete({ params }: HttpContextContract) {
    const { post_id } = params
    const post = await Post.findOrFail(post_id)
    await post.delete()
  }
}
