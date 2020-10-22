import React from 'react';

function Main({ history }) {
  return (
    <>
      <h1>Main page</h1>
      <button type="button" onClick={() => history.push('main')}>teste</button>
    </>
  );
}

export default Main;
