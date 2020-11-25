import React, { useState } from 'react'
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
  FormLabel
} from '@chakra-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import ImageUploader from 'react-images-upload'
import { updateLogin } from '../../../redux/ducks/user'
import cloudinary from '../../../services/cloudinary'

function Login({ user, updateLogin }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)

  const [picture, setPicture] = useState(null)
  const [picture_name, setPicture_name] = useState('Nenhuma imagem escolhida')

  const onDrop = picture => {
    setPicture(picture)
    setPicture_name(picture[0].name)
  }

  const formik = useFormik({
    initialValues: {
      email: user?.email,
      name: user?.name,
      nick: user?.nick,
      bio: user?.biografia
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email invalido')
        .required('Necessario preencher este campo.'),
      name: Yup.string().required('Necessario preencher este campo.')
    }),
    onSubmit: async values => {
      setIsLoading(true)
      try {
        let url = null

        if (picture) {
          const dataFile = new FormData()
          dataFile.append('file', picture[0])
          dataFile.append('upload_preset', 'freeroom')

          const file = await cloudinary.post('/image/upload', dataFile)

          url = file.data.url
        }

        await updateLogin(user?.id, { ...values, avatar: url })
        onClose()
        window.location.reload()
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
  })

  return (
    <>
      <Avatar
        cursor="pointer"
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
              <FormControl minHeight="70px">
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
              </FormControl>
              <FormControl minHeight="70px">
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

                <FormLabel>{picture_name}</FormLabel>
                <ImageUploader
                  defaultImage={picture && picture[0]}
                  withIcon
                  buttonText="Escolher Imagem"
                  onChange={onDrop}
                  imgExtension={['.jpg', '.jpeg', '.png', '.gif']}
                  maxFileSize={5242880}
                  fileTypeError="Esse tipo de arquivo não é permitido"
                  fileSizeError="Esse arquivo é muito grande"
                  label="Tamanho máximo: 5mb - Arquivos: jpg | png | gif"
                  singleImage
                />
              </FormControl>
              <Button
                type="submit"
                marginBottom="16px"
                variantColor="blue"
                minWidth={['xs', 'sm', 'md', 'lg']}
                isLoading={isLoading}
                loadingText="Submitting"
              >
                Atualizar
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

const mapStateToProps = ({ user }) => ({
  user: user.user
})

const mapDispatchToProps = {
  updateLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
