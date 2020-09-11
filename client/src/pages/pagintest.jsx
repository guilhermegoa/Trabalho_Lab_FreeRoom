import React from 'react';

import { Text, Button } from '@chakra-ui/core';

const paginatest = ({ history }) => (
  <>
    <Text>Pagina testeeeee</Text>
    <Button onClick={() => history.push('/')}>troca de pagina</Button>
  </>
);

export default paginatest;
