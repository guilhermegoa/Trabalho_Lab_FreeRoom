import React, { useState } from 'react';

import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  InputLeftElement,
  Button,
} from '@chakra-ui/core';
import LoginBackground from '../components/LoginBackground/index';

function CreateAccount({ history }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <LoginBackground>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="end"
        height="100%"
      >
        <Button
          borderRadius="50%"
          variantColor="transparent"
          top="16px"
          left="-120px"
          onClick={() => history.push('/')}
        >
          <Icon
            name="arrow-back"
            color="blue.400"
            height="56px"
            width="200px"
          />
        </Button>
        <Flex flexDirection="column" alignItems="center">
          <Heading
            as="h1"
            size="xl"
            fontSize="40px"
            margin="16"
            color="white"
          >
            Criar conta
          </Heading>
        </Flex>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          marginTop="24px"
        >
          <InputGroup size="md">
            <InputLeftElement>
              <Icon name="at-sign" color="blue.500" />
            </InputLeftElement>
            <Input
              color="white"
              variant="flushed"
              placeholder="Nome completo"
              minWidth={['xs', 'sm', 'md', 'lg', 'xl']}
            />
          </InputGroup>
          <InputGroup size="md" marginTop="8">
            <InputLeftElement>
              <Icon name="at-sign" color="blue.500" />
            </InputLeftElement>
            <Input
              color="white"
              variant="flushed"
              placeholder="E-mail"
              minWidth={['xs', 'sm', 'md', 'lg', 'xl']}
            />
          </InputGroup>
          <InputGroup size="md" marginTop="8">
            <InputLeftElement>
              <Icon name="lock" color="blue.500" />
            </InputLeftElement>
            <Input
              type={show ? 'text' : 'password'}
              placeholder="Senha"
              color="white"
              variant="flushed"
              minWidth={['xs', 'sm', 'md', 'lg', 'xl']}
            />
            <InputRightElement>
              {show
                ? <Icon name="view-off" onClick={handleClick} color="blue.500" />
                : <Icon name="view" onClick={handleClick} color="blue.500" />}
            </InputRightElement>
          </InputGroup>
          <InputGroup size="md" marginTop="8">
            <InputLeftElement>
              <Icon name="lock" color="blue.500" />
            </InputLeftElement>
            <Input
              type={show ? 'text' : 'password'}
              placeholder="Confirmar senha"
              color="white"
              variant="flushed"
              minWidth={['xs', 'sm', 'md', 'lg', 'xl']}
            />
          </InputGroup>
        </Flex>
        <Button
          marginTop="32px"
          variantColor="blue"
          minWidth={['xs', 'sm', 'md', 'lg', 'xl']}
        >
          Cadastrar
        </Button>
      </Flex>
    </LoginBackground>
  );
}

export default CreateAccount;
