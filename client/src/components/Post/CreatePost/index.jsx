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
  Input,
  FormControl,
  ModalFooter,
  FormLabel,
  Textarea,
  IconButton,
  useToast,
} from '@chakra-ui/core';
import ImageUploader from 'react-images-upload';
import { MdAdd, MdLightbulbOutline } from 'react-icons/md';
import { connect } from 'react-redux';
import api from '../../../services/api';
import cloudinary from '../../../services/cloudinary';
import { fetchCommunity } from '../../../redux/ducks/community';

function CreatePost({
  community, user, fetchCommunity, isLogged,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const COMMUNITY_RECOMMENDATION = "Recomendar Comunidades"
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [picture, setPicture] = useState(null);
  const [picture_name, setPicture_name] = useState('Nenhuma imagem escolhida');

  const onDrop = (picture) => {
    setLoading(true);
    setPicture(picture);
    setPicture_name(picture[0].name);
    setLoading(false);
  };

  const clearFields = () => {
    setTitle('');
    setContent('');
    setPicture('');
    setPicture_name('');
  };

  const sendPost = async () => {
    let success = false;
    setLoading(true);
    if (title && content) {
      let url = null;

      if (picture) {
        const dataFile = new FormData();
        dataFile.append('file', picture[0]);
        dataFile.append('upload_preset', 'freeroom');

        const file = await cloudinary.post('/image/upload', dataFile);

        url = file.data.url;
      }

      const data = {
        title,
        content,
        image_url: url,
      };

      try {
        await api.post(
          `/posts/${user.id}/create/${community.id}`,
          data,
        );
        fetchCommunity(community.id);
        clearFields();
        success = true
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      } finally {
        onClose();
      }
    }
    setLoading(false);
    return showMessage(success)
  };

  const showMessage = (success) => {
    return success ?
      toast({
        title: 'Post publicado',
        description: community.name === COMMUNITY_RECOMMENDATION ?
          'Sua recomendação de comunidade foi publicada com sucesso' : 'Seu novo post foi publicado com sucesso',
        status: 'success',
        duration: 5000,
        isClosable: true,
      }) :
      toast({
        title: 'Ocorreu um erro',
        description: 'Não foi possível salvar seu post, tente novamente mais tarde',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
  }

  const handleOnCLick = () => {
    if (isLogged) {
      return onOpen();
    }

    return (
      toast({
        title: 'Usuario não logado.',
        description: 'Necessario estar logado.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    );
  };

  return (
    <>
      <IconButton
        variantColor="purple"
        aria-label="Postar"
        fontSize="40px"
        size="lg"
        isRound="true"
        icon={community.name === COMMUNITY_RECOMMENDATION ? MdLightbulbOutline : MdAdd}
        position="fixed"
        bottom="20px"
        right="20px"
        onClick={handleOnCLick}
      />

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {community.name === COMMUNITY_RECOMMENDATION ? "Recomendar comunidade" :
              "Criar Post na comunidade " + community.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Título</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                focusBorderColor="purple.500"
                placeholder="Digite um título..."
              />
            </FormControl>

            <FormControl mt={4} mb={4} isRequired>
              <FormLabel>Conteúdo</FormLabel>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                focusBorderColor="purple.500"
                placeholder="Digite o seu texto"
              />
            </FormControl>

            <FormLabel>{picture_name}</FormLabel>
            <ImageUploader
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
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variantColor="purple"
              isLoading={loading}
              onClick={sendPost}
            >
              {community.name === COMMUNITY_RECOMMENDATION ? "Recomendar" : "Publicar"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
const mapStateToProps = (state) => ({
  community: state.community[0],
  user: state.user.user,
  isLogged: state.user.isLogged,
});

const mapDispatchToProps = {
  fetchCommunity,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
