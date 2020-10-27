import React from 'react';

import { Flex, SimpleGrid } from '@chakra-ui/core';

import PostCard from '../PostCard/index';
import NoPost from '../NoPost/index';

function PostList({ posts }) {
  return (
    <Flex align="center" justify="center">
      <SimpleGrid spacing="40px" maxW="md" w="100%">
        {posts.length > 0 ? (posts.map((value, index) => <PostCard post={value} image={value.image_url} key={`postCard-${index}`} />)) : <NoPost />}
      </SimpleGrid>
    </Flex>
  );
}

export default PostList;
