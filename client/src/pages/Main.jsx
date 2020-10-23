import React from 'react';

import CommunityList from '../components/CommunityList';

function Main({ history }) {
  return (
    <>
      <CommunityList />
      <h1>Main page</h1>
      <button type="button" onClick={() => history.push('communities/1')}>teste</button>
    </>
  );
}

export default Main;
