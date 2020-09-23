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
import api from '../services/api';
import LoginBackground from '../components/LoginBackground/index';
import Alert, { Types } from '../components/Alert/index';

function CreateAccount({ history }) {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowAlert, setIsShowAlert] = useState(false);

  const handleClick = () => setShow(!show);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(25, 'Menos de 25 caracteres')
        .required('Necessario preencher este campo.'),
      email: Yup.string()
        .email('Email invalido')
        .required('Necessario preencher este campo.'),
      password: Yup.string()
        .required('Necessario preencher este campo.'),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Senhas não são iguais.')
        .required('Necessario preencher este campo.'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await api.post('/register', values);
        history.push('/login');
      } catch (error) {
        setIsShowAlert(true);
      } finally {
        setIsLoading(false);
      }
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
        <Alert
          show={isShowAlert}
          setIsShowAlert={setIsShowAlert}
          status={Types.ERROR}
          title="Error ao criar cadastro."
          message="Tente novamente"
        />
        <PseudoBox
          marginRight="304px"
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
            Criar conta
          </Heading>
        </Flex>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <FormControl
              minHeight="70px"
              isInvalid={formik.touched.name && formik.errors.name}
            >
              <InputGroup size="md">
                <InputLeftElement>
                  <Icon name="info-outline" color="blue.500" />
                </InputLeftElement>
                <Input
                  color="white"
                  variant="flushed"
                  placeholder="* Nome completo"
                  minWidth={['xs', 'sm', 'md', 'lg', 'xl']}
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
              </InputGroup>
              <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
            </FormControl>
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
                  placeholder="* E-mail"
                  minWidth={['xs', 'sm', 'md', 'lg', 'xl']}
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
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
                  placeholder="* Senha"
                  color="white"
                  variant="flushed"
                  minWidth={['xs', 'sm', 'md', 'lg', 'xl']}
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <InputRightElement>
                  {show
                    ? <Icon name="view-off" onClick={handleClick} color="blue.500" />
                    : <Icon name="view" onClick={handleClick} color="blue.500" />}
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>
            <FormControl
              minHeight="70px"
              isInvalid={formik.touched.password_confirmation
                && formik.errors.password_confirmation}
            >
              <InputGroup size="md">
                <InputLeftElement>
                  <Icon name="lock" color="blue.500" />
                </InputLeftElement>
                <Input
                  type="password"
                  placeholder="* Confirmar senha"
                  color="white"
                  variant="flushed"
                  minWidth={['xs', 'sm', 'md', 'lg', 'xl']}
                  id="password_confirmation"
                  name="password_confirmation"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password_confirmation}
                />
              </InputGroup>
              <FormErrorMessage>{formik.errors.password_confirmation}</FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              marginTop="32px"
              variantColor="blue"
              minWidth={['xs', 'sm', 'md', 'lg', 'xl']}
              isLoading={isLoading}
              loadingText="Cadastrando"
            >
              Cadastrar
            </Button>
          </form>
        </Flex>
      </Flex>
    </LoginBackground>
  );
}

export default CreateAccount;
