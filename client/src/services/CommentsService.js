import api from './api';

const commentPath = 'comments';

const CommentsService = {
  commentPath,

  comment: (post_id, user_id, text) => api.post(commentPath, {
    post_id,
    user_id,
    text,
  }),
};

export default CommentsService;
