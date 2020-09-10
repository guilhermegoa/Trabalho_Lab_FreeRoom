import React from 'react';
import PropTypes from 'prop-types';

import { Text, Button } from '@chakra-ui/core';

function Home({ history }) {
  return (
    <>
      <Text fontSize="xl">hello world</Text>
      <Button onClick={() => history.push('/paginatest')}>
        troca de pagina
      </Button>
    </>
  );
}

Home.prototype = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Home.defaulProps = {
  history: { push: () => {} },
};

export default Home;
