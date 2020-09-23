import React, { Component } from 'react';
import { connect } from "react-redux";

// import { Text } from "@chakra-ui/core";

import Loading from '../components/Loading/index'
import PostList from '../components/PostList/index'

import { fetchCommunity } from '../redux/ducks/community'

class Community extends Component {

  componentDidMount() {
    this.props.dispatch(fetchCommunity(this.props.match.params.id));
  }

  /*<LoginBackground>
          <Text fontSize="6xl" color="#FFF" fontWeight="700">{community.name}</Text>
        </LoginBackground>*/

  render() {
    const { community } = this.props
    return (
      community ? (<PostList element={community}></PostList>)
        : <Loading></Loading>
    )
  }
}

const mapStateToProps = state => ({
  community: state.community[0],
})

export default connect(mapStateToProps)(Community);
