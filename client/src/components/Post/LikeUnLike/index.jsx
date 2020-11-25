import React from 'react'
import { Box, useToast } from '@chakra-ui/core'
import { connect } from 'react-redux'
import { MdThumbUp, MdThumbDown } from 'react-icons/md'
import LikeService from '../../../services/LikeService'
import { fetchPost } from '../../../redux/ducks/post'
import { fetchCommunity } from '../../../redux/ducks/community'

function Like_UnLike({ user, post, fetchPost, fetchCommunity }) {
  const toast = useToast()

  const handleLike = async () => {
    await LikeService.like(user.id, post[0].id)
    fetchCommunity(post[0].community_id)
    fetchPost(post[0].id)
  }

  const handleUnlike = async () => {
    await LikeService.unlike(user.id, post[0].id)
    fetchCommunity(post[0].community_id)
    fetchPost(post[0].id)
  }

  const handleLikeDelete = async () => {
    await LikeService.deleteLike(user.id, post[0].id)
    fetchCommunity(post[0].community_id)
    fetchPost(post[0].id)
  }

  const includesPostLike = is_like => {
    if (!user) {
      return null
    }

    // eslint-disable-next-line
    for (let i = 0; i < post[0].likesArray.length; i++) {
      if (
        post[0].likesArray[i].user_id === user.id &&
        post[0].likesArray[i].is_like === is_like
      ) {
        return true
      }
    }
    return false
  }

  const handleToast = () =>
    toast({
      title: 'Usuario não logado.',
      description: 'Necessario estar logado.',
      status: 'error',
      duration: 5000,
      isClosable: true
    })

  const handleOnClickLike = () => {
    if (!user) {
      return handleToast()
    }

    return includesPostLike(true) ? handleLikeDelete() : handleLike()
  }

  const handleOnClicUnkLike = () => {
    if (!user) {
      return handleToast()
    }

    return includesPostLike(false) ? handleLikeDelete() : handleUnlike()
  }

  return (
    <>
      <Box>
        <Box
          onClick={handleOnClickLike}
          cursor="pointer"
          display="inline"
          mr="3px"
          size="32px"
          as={MdThumbUp}
          color={includesPostLike(true) ? 'red.400' : 'blue.800'}
        />
        {post[0].likes}
        <Box
          onClick={handleOnClicUnkLike}
          cursor="pointer"
          display="inline"
          mr="3px"
          ml="10px"
          size="32px"
          as={MdThumbDown}
          color={includesPostLike(false) ? 'red.400' : 'blue.800'}
        />
        {post[0].unlikes}
      </Box>
    </>
  )
}

const mapStateToProps = ({ user, post }) => ({
  user: user.user,
  post
})

const mapDispatchToProps = {
  fetchPost,
  fetchCommunity
}

export default connect(mapStateToProps, mapDispatchToProps)(Like_UnLike)
