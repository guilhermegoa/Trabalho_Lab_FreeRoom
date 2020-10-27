import api from './api';

const likePath = 'likes';

const LikeService = {
  likePath,

  like: (user_id, post_id) => api.post(likePath, { user_id, post_id, is_like: true }),

  unlike: (user_id, post_id) => api.post(likePath, { user_id, post_id, is_like: false }),

  deleteLike: (user_id, post_id) => api.delete(`likes/user/${user_id}/post/${post_id}`),
};

export default LikeService;
