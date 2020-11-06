import React from 'react';
import { Flex } from '@chakra-ui/core';
import CommunityList from '../components/Community/CommunityList';
import PostsRecentes from '../components/Community/PostsRecentes';

function Main() {
  return (
    <Flex justifyContent="center" alignItems="flex-start" overflow="hidden">
      <CommunityList />
      <PostsRecentes />
    </Flex>
  );
}

export default Main;
