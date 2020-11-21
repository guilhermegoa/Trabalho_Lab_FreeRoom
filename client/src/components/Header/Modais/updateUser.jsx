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
  Avatar,
  Input,
  InputGroup,
  Icon,
  InputLeftElement,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { updateLogin } from '../../../redux/ducks/user';

function Login({ user, updateLogin }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: user?.email,
      name: user?.name,
      nick: user?.nick,
      bio: user?.biografia,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email invalido')
        .required('Necessario preencher este campo.'),
      name: Yup.string().required('Necessario preencher este campo.'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await updateLogin(user?.id, values);
        onClose();
        window.location.reload();
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

      <Avatar
        size="md"
        name={user?.name}
        src={user?.avatar}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} size="xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Atualize seus dados</ModalHeader>
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
                    value={formik.values.email}
                  />
                </InputGroup>
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                minHeight="70px"
                isInvalid={formik.touched.name && formik.errors.name}
              >
                <InputGroup size="md">
                  <InputLeftElement>
                    <Icon name="at-sign" color="blue.500" />
                  </InputLeftElement>
                  <Input
                    placeholder="Nome"
                    variant="flushed"
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
                // isInvalid={formik.touched.nick && formik.errors.nick}
              >
                <InputGroup size="md">
                  <InputLeftElement>
                    <Icon name="at-sign" color="blue.500" />
                  </InputLeftElement>
                  <Input
                    placeholder="Nick"
                    variant="flushed"
                    minWidth={['xs', 'sm']}
                    id="nick"
                    name="nick"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nick}
                  />
                </InputGroup>
                {/* <FormErrorMessage>{formik.errors.nick}</FormErrorMessage> */}
              </FormControl>
              <FormControl
                minHeight="70px"
                // isInvalid={formik.touched.bio && formik.errors.bio}
              >
                <InputGroup size="md">
                  <InputLeftElement>
                    <Icon name="at-sign" color="blue.500" />
                  </InputLeftElement>
                  <Input
                    placeholder="Uma frase sobre voce."
                    variant="flushed"
                    minWidth={['xs', 'sm']}
                    id="bio"
                    name="bio"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.bio}
                  />
                </InputGroup>
                {/* <FormErrorMessage>{formik.errors.bio}</FormErrorMessage> */}
              </FormControl>
              <Button
                type="submit"
                marginBottom="16px"
                variantColor="blue"
                minWidth={['xs', 'sm', 'md', 'lg', 'xl']}
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

const mapStateToProps = ({ user }) => ({
  user: user.user,
});

const mapDispatchToProps = {
  updateLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
