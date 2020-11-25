import Notification from 'App/Models/Notification'
import Post from 'App/Models/Post'
import User from 'App/Models/User'

import socketIo from 'App/Services/Ws'

export default class NotificationsController {
  public async retriveByUser({ params, response }) {
    const { user_id } = params

    const notifications = await await (
      await Notification.query().where({ user_id })
    ).reverse()

    return response.json(notifications)
  }

  public async create({ request, response }) {
    const { user_id, post_id, text } = request.only(['user_id', 'text'])

    let post = {} as Post | null
    if (post_id) {
      post = await Post.find(post_id)
    }

    const user = await User.find(user_id)
    if (!user || !post) {
      return response.status(404)
    }

    const notification = new Notification()
    notification.user_id = user_id
    notification.post_id = post_id
    notification.text = text
    notification.is_new = true

    await notification.related('user').associate(user)

    if (post_id) {
      await notification.related('post').associate(post)
    }

    socketIo.emit(`new-notify-${user_id}`, notification)

    return response.json(notification)
  }

  public async markAllNotificationAsRead({ params, response }) {
    const { user_id } = params

    const notifications = await Notification.query().where({
      user_id,
      is_new: true,
    })

    notifications.forEach((notification) => {
      notification.is_new = false
      notification.save()
    })

    return response.status(200)
  }
}
