import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Box, Tag, Avatar, Image } from '@chakra-ui/core'

import { MdThumbUp, MdModeComment, MdThumbDown } from 'react-icons/md'

import { fetchCommunity } from '../../redux/ducks/community'
import { retriveUser } from '../../redux/ducks/user'

function PostCard({ post }) {
  return (
    <Link to={`/post/${post.id}`}>
      <Box borderWidth="1px" rounded="lg" overflow="hidden" cursor="pointer">
        {post.image_url ? (
          <Image
            src={post.image_url}
            alt={post.title}
            backgroundColor="white"
          />
        ) : (
          <></>
        )}

        <Box p="6" backgroundColor="white">
          <Box d="flex" alignItems="baseline">
            <Tag variantColor="purple" rounded="full">
              <Avatar
                src={post.user ? post.user.avatar : ''}
                size="xs"
                name={post.user ? post.user.name : 'Desconhecido'}
                ml={-1}
                mr={2}
              />
              {post.user ? post.user.name : 'Desconhecido'}
            </Tag>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              <Box
                cursor="pointer"
                display="inline"
                mr="3px"
                size="14px"
                as={MdThumbUp}
              />
              {post.likes}
              <Box
                cursor="pointer"
                display="inline"
                mr="3px"
                ml="10px"
                size="14px"
                as={MdThumbDown}
              />
              {post.unlikes}
              <Box
                display="inline"
                mr="3px"
                ml="10px"
                size="14px"
                as={MdModeComment}
                color="purple.800"
              />
              {post.comments}
            </Box>
          </Box>

          <Box mt="5" fontWeight="semibold" lineHeight="tight" isTruncated>
            {post.title}
          </Box>

          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
            isTruncated
          >
            {post.content}
          </Box>
        </Box>
      </Box>
    </Link>
  )
}

const mapStateToProps = ({ user, community }) => ({
  user: user.user,
  isLogged: user.isLogged,
  community: community.community
})

const mapDispatchToProps = {
  community: fetchCommunity,
  fetchUser: retriveUser
}

export default connect(mapStateToProps, mapDispatchToProps)(PostCard)
