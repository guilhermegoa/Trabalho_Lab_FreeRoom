import React from 'react';

import {
  Flex, Heading, Text, Button,
} from '@chakra-ui/core';

import LoginBackground from '../components/LoginBackground/index';

function Home({ history }) {
  return (
    <LoginBackground>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="space-evenly"
        height="100%"
      >
        <Flex flexDirection="column" alignItems="center">
          <Heading
            as="h1"
            size="xl"
            fontSize="40px"
            margin="16"
            color="white"
          >
            Olá
          </Heading>
          <Text color="white" fontSize="24px">
            Bem vindo ao FreeRoom
          </Text>
        </Flex>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          marginTop="24px"
        >
          <Button
            minWidth={['xs', 'sm', 'md', 'lg', 'xl']}
            marginBottom="16px"
            variantColor="blue"
            rightIcon="arrow-forward"
            onClick={() => history.push('/login')}
          >
            <Text>Fazer login</Text>
          </Button>
          <Button
            minWidth={['xs', 'sm', 'md', 'lg', 'xl']}
            variantColor="blue"
            rightIcon="arrow-forward"
            onClick={() => history.push('/cadastrar')}
          >
            <Text textAlign="center">Não possui uma conta</Text>
          </Button>
        </Flex>
        <Text color="blue.400">Entrar como visitante</Text>
      </Flex>
    </LoginBackground>
  );
}

export default Home;
