import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  Box,
  Tag,
  Avatar,
  Image,
  Modal,
  Button,
  FormLabel,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Textarea,
  useToast,
  Text,
} from '@chakra-ui/core';
// import ImageUploader from 'react-images-upload';

import { MdThumbUp, MdModeComment, MdThumbDown } from 'react-icons/md';

import LikeService from '../../services/LikeService';
import CommentsService from '../../services/CommentsService';

import { fetchCommunity } from '../../redux/ducks/community';
import { retriveUser } from '../../redux/ducks/user';

function PostCard({
  user, isLogged, post, image, fetchUser, community,
}) {
  const redirectToLogin = () => this.props.history.push('/login');

  if (!isLogged) redirectToLogin();

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [text, setText] = useState('');

  const toast = useToast();

  const commentFunc = {
    hideModal: () => {
      setModalVisible(false);
      setText('');
    },
    handleChangeText: (e) => {
      setText(e.target.value);
    },
    handleSubmit: async () => {
      setIsLoading(true);
      CommentsService.comment(post.id, user.id, text).then((res) => {
        setIsLoading(false);
        setText('');

        res.status === 201
          ? toast({
            title: 'Comentario enviado',
            description: 'Seu comentário foi registrado',
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
          : toast({
            title: 'Algo de errado ocorreu',
            description: 'Seu comentário não foi registrado',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });

        community(post.community_id);
      });
    },
  };

  const handleLike = async (post_id) => {
    await LikeService.like(user.id, post_id);
    await fetchUser();
    community(post.community_id);
  };

  const handleUnlike = async (post_id) => {
    await LikeService.unlike(user.id, post_id);
    await fetchUser();
    community(post.community_id);
  };

  const handleLikeDelete = async (post_id) => {
    await LikeService.deleteLike(user.id, post_id);
    await fetchUser();
    community(post.community_id);
  };

  const handleCommentClick = async (post_id) => {
    setModalVisible(true);
  };

  const includesPostLike = (is_like) => {
    for (let i = 0; i < post.likesArray.length; i++) {
      if (
        post.likesArray[i].user_id === user.id
        && post.likesArray[i].is_like === is_like
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <Box borderWidth="1px" rounded="lg" overflow="hidden">
      {post.image_url ? <Image src={post.image_url} alt={post.title} /> : <></>}

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Tag variantColor="purple" rounded="full">
            <Avatar
              src={post.user ? post.user.avatar : ''}
              size="xs"
              name={post.user ? post.user.name : 'Desconhecido'}
              ml={-1}
              mr={2}
            />
            {post.user ? post.user.name : 'Desconhecido'}
          </Tag>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            <Box
              onClick={() => (includesPostLike(true)
                ? handleLikeDelete(post.id)
                : handleLike(post.id))}
              disabled={includesPostLike(true)}
              cursor="pointer"
              display="inline"
              mr="3px"
              size="14px"
              as={MdThumbUp}
              color={includesPostLike(true) ? 'red:800' : 'purple.800'}
            />
            {post.likes}

            <Box
              onClick={() => (includesPostLike(false)
                ? handleLikeDelete(post.id)
                : handleUnlike(post.id))}
              disabled={includesPostLike(false)}
              cursor="pointer"
              display="inline"
              mr="3px"
              ml="10px"
              size="14px"
              as={MdThumbDown}
              color={includesPostLike(false) ? 'red:800' : 'purple.800'}
            />
            {post.unlikes}

            <Box
              onClick={() => handleCommentClick(post.id)}
              cursor="pointer"
              display="inline"
              mr="3px"
              ml="10px"
              size="14px"
              as={MdModeComment}
              color="purple.800"
            />
            {post.comments}
          </Box>
        </Box>

        <Box mt="5" fontWeight="semibold" lineHeight="tight" isTruncated>
          {post.title}
        </Box>

        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
          ml="2"
          isTruncated
        >
          {post.content}
        </Box>
      </Box>

      <Modal
        // blockScrollOnMount={false}
        isOpen={modalVisible}
        onClose={commentFunc.hideModal}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Comentários '
            {post.title}
            '
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {post.commentsArray.length > 0 ? (
              post.commentsArray.map((comment, i) => (comment.user_id === user.id ? (
                <Box
                  key={comment.id}
                  align="right"
                  display="flex"
                  flexDirection="row-reverse"
                  bg="purple"
                  w="100%"
                  p={4}
                  color="black"
                >
                  <Avatar
                    src={comment.user ? comment.user.avatar : ''}
                    size="xs"
                    name={comment.user ? comment.user.name : 'Desconhecido'}
                    ml={-1}
                    mr={2}
                  />
                  <Text paddingRight="8px">{comment.text}</Text>
                </Box>
              ) : (
                <Box key={comment.id} w="100%" p={4} color="black">
                  <Avatar
                    src={comment.user ? comment.user.avatar : ''}
                    size="xs"
                    name={comment.user ? comment.user.name : 'Desconhecido'}
                    ml={-1}
                    mr={2}
                  />
                  {comment.text}
                </Box>
              )))
            ) : (
              <Box w="100%" p={4} color="black">
                Ninguém comentou ainda
              </Box>
            )}
            {/* */}
          </ModalBody>
          <ModalFooter>
            {/* <FormControl isRequired>
              <Input
                value={title}
                onChange={handleChangeTitle}
                focusBorderColor="purple.500"
                placeholder="Digite um título..."
              />
            </FormControl> */}

            <FormControl mt={4} mb={4} isRequired>
              <FormLabel>Comentário</FormLabel>
              <Textarea
                value={text}
                onChange={commentFunc.handleChangeText}
                focusBorderColor="purple.500"
                placeholder="Digite o seu comentário"
              />
            </FormControl>

            <Button variant="ghost" mr={3} onClick={commentFunc.hideModal}>
              Cancelar
            </Button>
            <Button
              variantColor="purple"
              isLoading={loading}
              onClick={commentFunc.handleSubmit}
            >
              Publicar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  isLogged: state.user.isLogged,
  community: state.community[0],
});

const mapDispatchToProps = {
  community: fetchCommunity,
  fetchUser: retriveUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCard);
