import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchPost } from '../redux/ducks/post';

function Post({ fetchPost, post }) {
  const POSTID = 2;

  const location = useLocation();

  useEffect(() => {
    const param = location.pathname
      .replace('/communities/', '')
      .split('/')[POSTID];

    if (post?.id !== param) {
      fetchPost(param);
    }
    // eslint-disable-next-line
  }, [post?.id, fetchPost]);

  return <div />;
}

const mapStateToProps = ({ user, community, post }) => ({
  user: user.user,
  isLogged: user.isLogged,
  community: community.community,
  post,
});

const mapDispatchToProps = {
  fetchPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
