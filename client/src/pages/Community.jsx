import React, { Component } from 'react';
import { connect } from "react-redux";

import { fetchCommunity } from '../redux/ducks/community'

class Community extends Component {

  componentDidMount() {
    this.props.dispatch(fetchCommunity(this.props.match.params.id));
  }

  render() {
    const { community } = this.props
    return (
      community ?
        <h1>
          comunidade {community.name}
        </h1> : <h1>loading</h1>
    )
  }
}

const mapStateToProps = state => ({
  community: state.community[0],
})

export default connect(mapStateToProps)(Community);
