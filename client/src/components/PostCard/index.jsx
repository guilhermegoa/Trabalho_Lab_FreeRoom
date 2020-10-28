import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  Box,
  Tag,
  Avatar,
  Image,
} from '@chakra-ui/core';

import { MdThumbUp, MdModeComment, MdThumbDown } from 'react-icons/md';

import { fetchCommunity } from '../../redux/ducks/community';
import { retriveUser } from '../../redux/ducks/user';

function PostCard({ post }) {
  const history = useHistory();

  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      cursor="pointer"
      onClick={() => history.push(`${history.location.pathname}/post/${post.id}`)}
    >
      {post.image_url ? <Image src={post.image_url} alt={post.title} backgroundColor="white" /> : <></>}

      <Box p="6" backgroundColor="white">
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
              // onClick={() => (includesPostLike(true)
              //   ? handleLikeDelete(post.id)
              //   : handleLike(post.id))}
              // disabled={includesPostLike(true)}
              cursor="pointer"
              display="inline"
              mr="3px"
              size="14px"
              as={MdThumbUp}
            />
            {post.likes}
            <Box
              cursor="pointer"
              display="inline"
              mr="3px"
              ml="10px"
              size="14px"
              as={MdThumbDown}
            />
            {post.unlikes}
            <Box
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

      {/* <Modal
        isOpen={modalVisible}
        onClose={commentFunc.hideModal}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Comentários
            {post.title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {post.commentsArray.length > 0 ? (
              post.commentsArray.map((comment) => (comment.user_id === user.id ? (
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
          </ModalBody>
          <ModalFooter>
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
      </Modal> */}
    </Box>
  );
}

const mapStateToProps = ({ user, community }) => ({
  user: user.user,
  isLogged: user.isLogged,
  community: community.community,
});

const mapDispatchToProps = {
  community: fetchCommunity,
  fetchUser: retriveUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCard);
