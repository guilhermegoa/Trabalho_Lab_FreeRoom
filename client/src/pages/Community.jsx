import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/core'
import Loading from '../components/Loading/index'
import PostList from '../components/PostList/index'
import CreatePost from '../components/Post/CreatePost'

import { fetchCommunity } from '../redux/ducks/community'

function Community({ fetchCommunity, community }) {
  const params = useParams()

  useEffect(() => {
    const { id } = params

    if (community?.id !== id) {
      fetchCommunity(id)
    }
    // eslint-disable-next-line
  }, [community?.id, location.pathname])

  const calculateHot = post => {
    const dateTime = new Date() - new Date(post.created_at)
    const likes = post.likes === 0 ? 1 : post.likes
    return dateTime / likes
  }

  const hotPosts = posts => {
    const newPosts = [...posts]
    newPosts.sort((a, b) => calculateHot(a) - calculateHot(b))
    return newPosts
  }

  const newPosts = posts => {
    const newPosts = [...posts]
    newPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    return newPosts
  }

  const topPosts = posts => {
    const newPosts = [...posts]
    newPosts.sort((a, b) => b.likes - a.likes)
    return newPosts
  }

  return community ? (
    <Tabs variantColor="purple" variant="soft-rounded">
      <TabList justifyContent="center" my="30px">
        <Tab>Calientes</Tab>
        <Tab>Novos</Tab>
        <Tab>Top</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <PostList posts={hotPosts(community.posts)} />
        </TabPanel>
        <TabPanel>
          <PostList posts={newPosts(community.posts)} />
        </TabPanel>
        <TabPanel>
          <PostList posts={topPosts(community.posts)} />
        </TabPanel>
      </TabPanels>
      <CreatePost />
    </Tabs>
  ) : (
    <Loading />
  )
}

const mapStateToProps = state => ({
  community: state.community[0],
  user: state.user.user,
  isLogged: state.user.isLogged
})

const mapDispatchToProps = {
  fetchCommunity
}

export default connect(mapStateToProps, mapDispatchToProps)(Community)
