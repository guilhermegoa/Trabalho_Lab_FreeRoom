import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Text, Image, Avatar } from '@chakra-ui/core'
import { MdModeComment } from 'react-icons/md'
import { fetchPost } from '../redux/ducks/post'
import Loading from '../components/Loading'
import LikeUnLike from '../components/Post/LikeUnLike'
import Comment from '../components/Post/Comment'

function Post({ fetchPost, post }) {

  const { id } = useParams()

  useEffect(() => {
    if (post?.id !== id) {
      fetchPost(id)
    }
    // eslint-disable-next-line
  }, [post?.id, fetchPost])

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
          <Box display="flex">
            <Box size="56px">
              <Avatar
                size="lg"
                name={post[0].user.name}
                src={post[0].user.avatar}
              />
            </Box>
            <Box marginLeft="16px">
              <Text>{post[0].user.name}</Text>
              <Text>{new Date(post[0].updated_at).toLocaleString()}</Text>
            </Box>
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
              color="purple.800"
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

const mapStateToProps = ({ community, post }) => ({
  community: community.community,
  post
})

const mapDispatchToProps = {
  fetchPost
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
