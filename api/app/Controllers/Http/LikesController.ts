// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Post from 'App/Models/Post'
import Like from 'App/Models/Like'
import User from 'App/Models/User'

export default class LikesController {
  public async create({ request, response }) {
    const { user_id, post_id, is_like } = request.only([
      'user_id',
      'post_id',
      'is_like',
    ])

    if (!user_id || !post_id || is_like === undefined || is_like === null)
      return response.status(400)

    const likes = await Like.query().where({ user_id, post_id, is_like })

    if (likes.length > 0) return response.status(409).json('Already liked')

    try {
      const unLike = await Like.query()
        .where({ user_id, post_id, is_like: !is_like })
        .first()

      const post = await Post.find(post_id)
      if (!post) {
        return response.status(404).json('Não existe o post')
      }

      if (unLike) {
        unLike.is_like = is_like

        if (is_like) {
          post.likes += 1
          post.unlikes -= 1
        } else {
          post.unlikes += 1
          post.likes -= 1
        }

        await post.save()
        await unLike.save()
        return response.status(201).json(unLike)
      }

      const user = await User.find(user_id)
      if (!user) {
        return response.status(404).json('Não existe o usuário')
      }

      const like = new Like()
      like.post_id = post_id
      like.user_id = user_id
      like.is_like = is_like

      await like.related('user').associate(user)
      await like.related('post').associate(post)]

      if (is_like) {
        post.likes += 1
      } else {
        post.unlikes += 1
      }

      await post.save()
      return response.status(201).json(like)
    } catch (e) {
      return response.status(500).json(e.message)
    }
  }

  public async createUnLike({ request, response }) {
    const { user_id, post_id } = request.only(['user_id', 'post_id'])

    if (!user_id || !post_id) return response.status(400)

    const likes = await Like.query().where({ user_id, post_id, is_liked: true })

    if (likes.length > 0) return response.status(409).json('Already liked')

    try {
      const unLike = await Like.query()
        .where({ user_id, post_id, is_liked: false })
        .first()

      if (unLike) {
        unLike.is_like = true
        unLike.post.likes += 1
        unLike.post.save()
        unLike.save()
        return response.status(201).json(unLike)
      }

      const user = await User.find(user_id)
      if (!user) {
        return response.status(404).json('Não existe o usuário')
      }
      const post = await Post.find(post_id)
      if (!post) {
        return response.status(404).json('Não existe o post')
      }

      const like = new Like()
      like.post_id = post_id
      like.user_id = user_id

      await like.related('user').associate(user)
      await like.related('post').associate(post)
      post.likes += 1
      await post.save()
      return response.status(201).json(like)
    } catch (e) {
      return response.status(500).json()
    }
  }

  public async retriveAll({ response }) {
    return response.json(await Like.all())
  }

  public async retriveByPost({ response }) {
    return response.json('Not working yet')
  }

  public async retriveByUser({ response }) {
    return response.json('Not working yet')
  }

  public async delete({ params, response }) {
    const { user_id, post_id } = params

    if (!user_id || !post_id) return response.status(400)

    const like = await Like.query().where({ user_id, post_id }).first()

    if (!like) return response.status(404)
    const hasDelete = like.delete()

    if (!hasDelete) return response.status(409)

    const post = await Post.find(post_id)
    if (post) {
      post.likes -= 1
      post.save()
    }

    return response.status(204).json(hasDelete)
  }
}
