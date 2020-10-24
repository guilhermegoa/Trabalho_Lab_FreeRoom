import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  InputLeftElement,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { userLogin, retriveUser, validedToken } from '../../../redux/ducks/user';

function Login({ login, retriveUser, validedToken }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      password: Yup.string().required('Necessario preencher este campo.'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await login(values);
        await validedToken();
        await retriveUser();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>

      <Button onClick={onOpen}>
        <Text textAlign="center">Login</Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <FormControl
                minHeight="70px"
                isInvalid={formik.touched.email && formik.errors.email}
              >
                <InputGroup size="md">
                  <InputLeftElement>
                    <Icon name="at-sign" color="blue.500" />
                  </InputLeftElement>
                  <Input
                    variant="flushed"
                    placeholder="E-mail"
                    minWidth={['xs', 'sm']}
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
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
                    variant="flushed"
                    minWidth={['xs', 'sm']}
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  <InputRightElement>
                    {show ? (
                      <Icon
                        name="view-off"
                        onClick={handleClick}
                        color="blue.500"
                      />
                    ) : (
                      <Icon name="view" onClick={handleClick} color="blue.500" />
                    )}
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                marginBottom="16px"
                variantColor="blue"
                minWidth={['xs', 'sm']}
                isLoading={isLoading}
                loadingText="Submitting"
              >
                Entrar
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
const mapDispatchToProps = {
  login: userLogin,
  retriveUser,
  validedToken,
};

export default connect(null, mapDispatchToProps)(Login);
