import React from 'react';
import { Flex } from '@chakra-ui/core';
import CommunityList from '../components/CommunityList';
import PostsRecentes from '../components/PostsRecentes';

function Main() {
  return (
    <Flex justifyContent="center" alignItems="flex-start" overflow="hidden">
      <CommunityList />
      <PostsRecentes />
    </Flex>
  );
}

export default Main;
