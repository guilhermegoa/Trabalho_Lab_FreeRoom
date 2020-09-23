import React from 'react'

import { Flex, SimpleGrid } from '@chakra-ui/core';

import PostCard from '../PostCard/index'

function PostList({ element }) {
  const posts = element.posts
  console.log(posts)
  return (
    <Flex align="center" justify="center" >
      <SimpleGrid spacing="40px">
        {posts.map((value, index) => {
          return <PostCard post={value} key={"postCard-" + index}></PostCard>
        })}   </SimpleGrid>
    </Flex>
  )
}

export default PostList