import React from 'react';

function Main({ history }) {
  return (
    <>
      <h1>Main page</h1>
      <button onClick={() => history.push('/communities/1')}>teste</button>
    </>
  );
}

export default Main;
