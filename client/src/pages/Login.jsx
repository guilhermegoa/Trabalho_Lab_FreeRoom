import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  InputLeftElement,
  Button,
  PseudoBox,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/core';
import LoginBackground from '../components/LoginBackground/index';

function Login({ history }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email invalido')
        .required('Necessario preencher este campo.'),
      password: Yup.string()
        .required('Necessario preencher este campo.'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <LoginBackground>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="end"
        height="100%"
      >
        <PseudoBox
          borderRadius="50%"
          variant="outline"
          border="none"
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
        </PseudoBox>
        <Flex flexDirection="column" alignItems="center">
          <Heading
            as="h1"
            size="xl"
            fontSize="40px"
            margin="16"
            color="white"
          >
            Faça login em sua conta
          </Heading>
        </Flex>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          marginTop="24px"
        >
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              minHeight="70px"
              isInvalid={formik.touched.email && formik.errors.email}
            >
              <InputGroup size="md">
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
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl
              minHeight="70px"
              isInvalid={formik.touched.password && formik.errors.password}
            >
              <InputGroup size="md">
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
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              marginTop="32px"
              variantColor="blue"
              minWidth={['xs', 'sm', 'md', 'lg', 'xl']}
            >
              Entrar
            </Button>
          </form>
        </Flex>
      </Flex>
    </LoginBackground>
  );
}

export default Login;
