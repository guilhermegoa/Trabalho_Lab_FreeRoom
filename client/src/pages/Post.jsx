import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Text, Image, Avatar, Icon } from '@chakra-ui/core'
import { MdModeComment, MdVolumeOff, MdVolumeUp } from 'react-icons/md'
import { fetchPost } from '../redux/ducks/post'
import { mutePost, activeNotifications } from '../redux/ducks/user'
import Loading from '../components/Loading'
import LikeUnLike from '../components/Post/LikeUnLike'
import Comment from '../components/Post/Comment'

function Post({
  user,
  fetchPost,
  post,
  mutePost,
  anctiNotifications,
  isLogged
}) {
  const [shouldNotify, setIfShouldNotify] = useState(false)
  const { id: idString } = useParams()
  const id = parseInt(idString)

  const isRegister = () => {
    return !!user.postAlerts.find(item => {
      return id === item
    })
  }

  const handleMute = () => {
    mutePost({ post_id: id, user_id: user.id })
    setIfShouldNotify(false)
  }

  const handleNotify = () => {
    anctiNotifications({ post_id: id, user_id: user.id })
    setIfShouldNotify(true)
  }

  useEffect(() => {
    if (!post || post[0].id !== id) {
      fetchPost(id)
    }
    if (user) {
      setIfShouldNotify(isRegister())
    }
    // eslint-disable-next-line
  }, [post, fetchPost, user])

  return post ? (
    <>
      <Box
        maxW="800px"
        margin="0 auto"
        rounded="lg"
        overflow="hidden"
        backgroundColor="white"
        padding="8px"
      >
        <Box display="flex" justifyContent="space-between">
          <Box width="100%" display="flex">
            <Box>
              <Avatar
                size="lg"
                name={post[0].user.name}
                src={post[0].user.avatar}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              marginLeft="16px"
            >
              <Text>{post[0].user.name}</Text>
              <Text>{new Date(post[0].updated_at).toLocaleString()}</Text>
            </Box>
            {isLogged ? (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                paddingRight="24px"
                flex="auto"
              >
                <Icon
                  name="bell"
                  color={shouldNotify ? 'red.500' : 'blue.900'}
                  cursor="pointer"
                  size="1.5em"
                  as={shouldNotify ? MdVolumeUp : MdVolumeOff}
                  onClick={shouldNotify ? handleMute : handleNotify}
                />
              </Box>
            ) : null}
          </Box>
        </Box>
        <Box padding="32px" display="flex" flexDirection="column">
          <Text fontSize="4xl">{post[0].title}</Text>
          <Text>{post[0].content}</Text>
          <Box margin="auto">
            {post[0].image_url && (
              <Image
                src={post[0].image_url}
                alt={post[0].title}
                backgroundColor="white"
              />
            )}
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-around"
          marginX="32px"
          marginY="16px"
        >
          <Box cursor="pointer">
            <Box
              display="inline"
              mr="3px"
              ml="10px"
              size="32px"
              as={MdModeComment}
              color="blue.800"
            />
            {post[0].comments} Comentarios
          </Box>
          <LikeUnLike />
        </Box>
      </Box>
      <Comment />
    </>
  ) : (
    <Loading />
  )
}

const mapStateToProps = ({ community, post, user }) => ({
  community: community.community,
  post,
  user: user.user,
  isLogged: user.isLogged
})

const mapDispatchToProps = {
  fetchPost,
  mutePost,
  anctiNotifications: activeNotifications
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
