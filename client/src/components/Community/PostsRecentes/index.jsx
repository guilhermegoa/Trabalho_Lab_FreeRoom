import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Text, Avatar, Spinner } from '@chakra-ui/core'
import { MdThumbUp, MdModeComment, MdThumbDown } from 'react-icons/md'
import api from '../../../services/api'

function CommunityList() {
  const [recentPosts, setRecentPosts] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!recentPosts) {
      setLoading(true)
      api
        .get('/recentposts')
        .then(res => res.data.length !== 0 && setRecentPosts(res.data))
        .finally(setLoading(false))
    }
  }, [recentPosts])

  const renderContentLoadingOrNotFound = () =>
    loading ? (
      <Box margin="32px auto">
        <Spinner thickness="4px" speed="0.65s" size="md" color="blue.800" />
      </Box>
    ) : (
      <Box
        display="flex"
        borderWidth="1px"
        overflow="hidden"
        backgroundColor="white"
        height="120px"
        width="400px"
        justifyContent="center"
        alignItems="center"
      >
        Nenhum post encontrado
      </Box>
    )

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      overflow="hidden"
      marginRight="8px"
    >
      <Text fontSize="2xl" backgroundColor="white" paddingLeft="8px">
        Recentes
      </Text>
      {recentPosts
        ? recentPosts.map(post => (
            <Link key={`${post.name}_${post.id}`} to={`/post/${post.id}`}>
              <Box
                display="flex"
                borderWidth="1px"
                overflow="hidden"
                backgroundColor="white"
                height="120px"
                width="400px"
                padding="16px"
                borderLeft="4px"
                borderLeftColor={post.community.color}
                cursor="pointer"
              >
                <Box>
                  <Avatar
                    size="lg"
                    name={post.user.name}
                    src={post.user.avatar}
                  />
                  <Text fontSize="sm" textAlign="center" marginY="8px">
                    {post.user.name}
                  </Text>
                </Box>
                <Box marginLeft="16px" width="100%">
                  <Text fontSize="xl" marginBottom="8px" fontWeight="bold">
                    {post.title}
                  </Text>
                  <Text fontSize="sm">{`${post.content.substring(
                    0,
                    30
                  )}...`}</Text>
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                    cursor="default"
                    marginTop="16px"
                  >
                    <Box
                      display="inline"
                      mr="3px"
                      ml="10px"
                      size="14px"
                      as={MdThumbUp}
                      color="purple.800"
                      cursor="default"
                    />
                    {post.likes}
                    <Box
                      display="inline"
                      mr="3px"
                      ml="10px"
                      size="14px"
                      as={MdThumbDown}
                      color="purple.800"
                      cursor="default"
                    />
                    {post.unlikes}
                    <Box
                      display="inline"
                      mr="3px"
                      ml="10px"
                      size="14px"
                      as={MdModeComment}
                      color="purple.800"
                      cursor="default"
                    />
                    {post.comments}
                  </Box>
                </Box>
              </Box>
            </Link>
          ))
        : renderContentLoadingOrNotFound()}
    </Box>
  )
}

export default CommunityList
