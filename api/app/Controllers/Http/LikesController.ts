// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Post from 'App/Models/Post'
import Like from 'App/Models/Like'
import User from 'App/Models/User'
import Community from 'App/Models/Community'

import { RECOMENDATION_COMMUNITY_NAME } from "../../../database/seeders/Community"
export default class LikesController {
  public async create({ request, response }) {
    try {
      const { user_id, post_id, is_like } = request.only([
        'user_id',
        'post_id',
        'is_like',
      ])

      if (!user_id || !post_id || is_like === undefined || is_like === null)
        return response.status(400).json(
          `${post_id ? '' : 'missing post_id\n'}
          ${user_id ? '' : 'missing user_id\n'}
          ${is_like ? '' : 'missing is_like\n'}`
        )

      const likes = await Like.query().where({ user_id, post_id, is_like })

      if (likes.length > 0) return response.status(409).json('Already liked')

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
      await like.related('post').associate(post)

      if (is_like) {
        post.likes += 1
      } else {
        post.unlikes += 1
      }

      this.verifyCommunity(post)

      await post.save()
      return response.status(201).json(like)
    } catch (e) {
      return response.status(500).json(e.message)
    }
  }

  async verifyCommunity(post) {
    const jsonPost = post.toJSON()
    const community_id = post.community_id
    const postCommunity = await Community.find(community_id)

    if (postCommunity?.name !== RECOMENDATION_COMMUNITY_NAME) {
      return false
    }

    const title = jsonPost.title
    const communityExists = await Community.query().where({ name: title }).first()

    if (!communityExists) {
      const likes = jsonPost.likes
      const users = (await User.all()).length
      const reach = users < 1000 ? Math.round(users * 0.6) : 1000

      if (likes >= reach) {
        const community = new Community()
        community.name = title
        community.description = jsonPost.content
        community.image_url = jsonPost.image_url

        try {
          await community.save()
          return true
        } catch (error) {
          return false
        }
      }
    }
    return false
  }

  public async retriveAll({ response }) {
    try {
      return response.json(await Like.all())
    } catch (e) {
      return response.status(500).json(e.message)
    }
  }

  public async retriveByPostAndUser({ params, response }) {
    try {
      const { user_id, post_id } = params

      if (!user_id || !post_id)
        return response.status(400).json(
          `${post_id ? '' : 'missing post_id\n'}
          ${user_id ? '' : 'missing user_id\n'}`
        )

      const likes = await Like.query().where({ user_id, post_id })
      return response.json(likes)
    } catch (e) {
      return response.status(500).json(e.message)
    }
  }

  public async retriveByPost({ params, response }) {
    try {
      const { post_id } = params

      if (!post_id) return response.status(400).json('missing post_id\n')

      const likes = await Like.query().where({ post_id })
      return response.json(likes)
    } catch (e) {
      return response.status(500).json(e.message)
    }
  }

  public async retriveByUser({ params, response }) {
    try {
      const { user_id } = params

      if (!user_id) return response.status(400).json('missing user_id\n')

      const likes = await Like.query().where({ user_id })
      return response.json(likes)
    } catch (e) {
      return response.status(500).json(e.message)
    }
  }

  public async delete({ params, response }) {
    try {
      const { user_id, post_id } = params

      if (!user_id || !post_id)
        return response.status(400).json(
          `${post_id ? '' : 'missing post_id\n'}
        ${user_id ? '' : 'missing user_id\n'}`
        )

      const like = await Like.query().where({ user_id, post_id }).first()

      if (!like) return response.status(404)
      const is_like = like.is_like
      const hasDelete = like.delete()

      if (!hasDelete) return response.status(409)

      const post = await Post.find(post_id)
      if (!post) return response.status(404)

      if (is_like) {
        post.likes -= 1
      } else {
        post.unlikes -= 1
      }
      post.save()

      return response.status(204).json(hasDelete)
    } catch (e) {
      return response.status(500).json(e.message)
    }
  }
}
