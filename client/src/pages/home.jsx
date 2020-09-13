import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';


import { Text, Button, List, ListItem, Flex } from '@chakra-ui/core';
import api from '../services/api';

const Home = ({ history }) => {
  const [users, setUsers] = useState();

  useEffect(() => {
    if(!users){
      api.get('/users').then(res => setUsers(res.data)) ;  
    }
  })

  return (
    <>
    <Flex justify="center">
      <Text fontSize="xl">Usuarios</Text>
    </Flex>
    <Flex direction="column" align="center">
      <List styleType="disc">
        {users && users.map(user =>   
        <ListItem key={user.id} >Email: {user.email}</ListItem>) }
      </List>
      <Button onClick={() => history.push('/paginatest')}>
        Teste de cadastro
      </Button>
    </Flex>
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
