// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Post from 'App/Models/Post'
import User from 'App/Models/User'
import Community from 'App/Models/Community'
import Notification from 'App/Models/Notification'

import socketIo from 'App/Services/Ws'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { RECOMENDATION_COMMUNITY_NAME } from '../../../database/seeders/Community'

export default class PostsController {
  public async index({ params }: HttpContextContract) {
    const { search } = params
    if (search) {
      return Post.query()
        .whereRaw('LOWER(content) LIKE ?', [`%${search.toLowerCase()}%`])
        .orWhereRaw('LOWER(title) LIKE ?', [`%${search.toLowerCase()}%`])
        .preload('community')
        .preload('user')
        .preload('likesArray')
        .preload('commentsArray')
    }
    return Post.query().preload('likesArray')
  }

  public async show({ params }: HttpContextContract) {
    const { post_id } = params
    const post = await Post.query()
      .where('id', post_id)
      // .preload('community')
      .preload('user', (query) => query.select('id', 'name', 'avatar'))
      .preload('likesArray')
      .preload('commentsArray', (query) => {
        query.preload('user', (query) => query.select('id', 'name', 'avatar'))
      })

    return post
  }

  public async store({ params, request, response }: HttpContextContract) {
    const data = request.only(['title', 'content', 'image_url'])

    const { user_id, community_id } = params

    const user = await User.find(user_id)
    if (!user) {
      throw new Error('Não existe o usuário')
    }
    const community = await Community.query()
      .where({ id: community_id })
      .preload('community_user')
      .first()
    if (!community) {
      throw new Error('Não existe a comunidade')
    }

    if (community.name === RECOMENDATION_COMMUNITY_NAME) {
      const communityExists = await Community.query()
        .where({ name: data.title })
        .first()

      if (communityExists) {
        throw new Error('Já existe uma comunidade com esse nome')
      }
    }
    const post = new Post()
    post.title = data.title
    post.content = data.content
    post.community_id = community_id
    post.user_id = user_id
    post.image_url = data.image_url

    let done = false

    try {
      await post.related('user').associate(user)
      await post.related('community').associate(community)

      done = true
      socketIo.emit(`new-post-${community.id}`, post)
    } catch (error) {
      throw new Error(error)
    }

    if (done) {
      response.json('Post publicado com sucesso')
      community.community_user.forEach(async (com_user) => {
        const notification = new Notification()
        notification.user_id = com_user.id
        notification.text = `Um novo post foi criado na comunidade ${community.name}. \n ${post.title}`
        notification.post_id = post.id
        notification.is_new = true

        await notification.related('user').associate(com_user)
        await notification.related('post').associate(post)

        socketIo.emit(`new-notify-${com_user.id}`, notification)
      })
    }
  }

  public async delete({ params }: HttpContextContract) {
    const { post_id } = params
    const post = await Post.findOrFail(post_id)
    await post.delete()
  }

  public async recentPosts() {
    const posts = await Post.query()
      .select('*')
      .orderBy('updated_at', 'desc')
      .limit(10)
      .preload('user', (query) => query.select('id', 'name', 'avatar'))
      .preload('community', (query) => query.select('id', 'color'))

    return posts
  }

  public async registerAlert({ request, response }) {
    const { user_id, post_id } = request.only(['user_id', 'post_id'])

    const user = await User.find(user_id)
    const post = await Post.find(post_id)

    if (!user || !post) {
      return response.status(404)
    }

    await user.related('postAlerts').save(post)
    await post.related('userAlerts').save(user)
    return response.status(200)
  }

  public async unregisterAlert({ params, response }) {
    const { user_id, post_id } = params

    const user = await User.find(user_id)
    const post = await Post.find(post_id)

    if (!user || !post) {
      return response.status(404)
    }
    await user
      .related('postAlerts')
      .pivotQuery()
      .where({ user_id, post_id })
      .delete()

    return response.status(204)
  }
}
