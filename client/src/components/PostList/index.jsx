import React from 'react';

import { Flex, SimpleGrid } from '@chakra-ui/core';

import PostCard from '../PostCard/index';

function PostList({ element }) {
  const { posts } = element;
  return (
    <Flex align="center" justify="center">
      <SimpleGrid spacing="40px" maxW="md" w="100%">
        {posts.map((value, index) => <PostCard post={value} image={value.image_url} key={`postCard-${index}`} />)}
      </SimpleGrid>
    </Flex>
  );
}

export default PostList;
