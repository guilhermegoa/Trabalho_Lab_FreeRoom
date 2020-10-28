import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Tabs, TabList, TabPanels, Tab, TabPanel,
} from '@chakra-ui/core';
import Loading from '../components/Loading/index';
import PostList from '../components/PostList/index';

import SearchService from '../services/SearchService';

function PostSearch() {
  const { search } = useParams();
  const [postsRetrieved, setPostsRetrieved] = useState();

  useEffect(() => {
    SearchService.searchPosts(search).then(({ data }) => {
      setPostsRetrieved(data);
    });
  }, [search]);

  const calculateHot = (posts) => {
    const dateTime = new Date() - new Date(posts.created_at);
    const likes = posts.likes === 0 ? 1 : posts.likes;
    return dateTime / likes;
  };

  const hotPosts = (posts) => {
    const newPosts = [...posts];
    newPosts.sort((a, b) => calculateHot(a) - calculateHot(b));
    return newPosts;
  };

  const newPosts = (posts) => {
    const newPosts = [...posts];
    newPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return newPosts;
  };

  const topPosts = (posts) => {
    const newPosts = [...posts];
    newPosts.sort((a, b) => b.likes - a.likes);
    return newPosts;
  };

  return postsRetrieved ? (
    <Tabs variantColor="purple" variant="soft-rounded">
      <TabList justifyContent="center" my="30px">
        <Tab>Calientes</Tab>
        <Tab>Novos</Tab>
        <Tab>Top</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <PostList posts={hotPosts(postsRetrieved)} />
        </TabPanel>
        <TabPanel>
          <PostList posts={newPosts(postsRetrieved)} />
        </TabPanel>
        <TabPanel>
          <PostList posts={topPosts(postsRetrieved)} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  ) : (
    <Loading />
  );
}

export default PostSearch;
