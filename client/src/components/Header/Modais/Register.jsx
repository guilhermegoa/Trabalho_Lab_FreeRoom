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
import api from '../../../services/api';
import Alert, { Types } from '../../Alert';

function Register() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        onClose();
      } catch (error) {
        setIsShowAlert(true);
      } finally {
        setIsLoading(false);
      }
    },
  });
  return (
    <>
      <Alert
        show={isShowAlert}
        setIsShowAlert={setIsShowAlert}
        status={Types.ERROR}
        title="Error ao criar cadastro."
        message="Tente novamente"
      />
      <Button onClick={onOpen}>
        <Text textAlign="center">Registrar</Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registrar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
                    variant="flushed"
                    placeholder="* Nome completo"
                    minWidth={['xs', 'sm']}
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
                    variant="flushed"
                    placeholder="* E-mail"
                    minWidth={['xs', 'sm']}
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
                    variant="flushed"
                    minWidth={['xs', 'sm']}
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
                    variant="flushed"
                    minWidth={['xs', 'sm']}
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
                variantColor="blue"
                minWidth={['xs', 'sm']}
                isLoading={isLoading}
                loadingText="Cadastrando"
                marginBottom="16px"
              >
                Cadastrar
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Register;
