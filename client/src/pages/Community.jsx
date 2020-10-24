import React, { Component } from 'react';

import { connect } from 'react-redux';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/core';

import Loading from '../components/Loading/index';
import PostList from '../components/PostList/index';
import CreatePost from '../components/CreatePost';

import { fetchCommunity } from '../redux/ducks/community';
import { retriveUser } from '../redux/ducks/user';

class Community extends Component {
  async componentDidMount() {
    await this.props.dispatch(retriveUser());
    this.props.dispatch(fetchCommunity(this.props.match.params.id));
  }

  calculateHot(post) {
    const dateTime = new Date() - new Date(post.created_at);
    const likes = post.likes === 0 ? 1 : post.likes;
    return dateTime / likes;
  }

  hotPosts(posts) {
    const newPosts = [...posts];
    newPosts.sort((a, b) => this.calculateHot(a) - this.calculateHot(b));
    return newPosts;
  }

  newPosts(posts) {
    const newPosts = [...posts];
    newPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return newPosts;
  }

  topPosts(posts) {
    const newPosts = [...posts];
    newPosts.sort((a, b) => b.likes - a.likes);
    return newPosts;
  }

  render() {
    const { community } = this.props;
    return community ? (
      <Tabs variantColor="purple" variant="soft-rounded">

        <TabList justifyContent="center" my="30px">
          <Tab>Calientes</Tab>
          <Tab>Novos</Tab>
          <Tab>Top</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <PostList posts={this.hotPosts(community.posts)} />
          </TabPanel>
          <TabPanel>
            <PostList posts={this.newPosts(community.posts)} />
          </TabPanel>
          <TabPanel>
            <PostList posts={this.topPosts(community.posts)} />
          </TabPanel>
        </TabPanels>
        <CreatePost />
      </Tabs>
    ) : (
      <Loading />
    );
  }
}

const mapStateToProps = (state) => ({
  community: state.community[0],
  user: state.user.user,
  isLogged: state.user.isLogged,
});

export default connect(mapStateToProps)(Community);
