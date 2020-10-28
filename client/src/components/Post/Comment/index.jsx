import React, { useState } from 'react';
import {
  Box,
  useToast,
  InputGroup,
  Textarea,
  InputRightElement,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/core';
import { MdSend } from 'react-icons/md';
import { connect } from 'react-redux';
import CommentsService from '../../../services/CommentsService';
import { fetchCommunity } from '../../../redux/ducks/community';
import { fetchPost } from '../../../redux/ducks/post';

function Comment({
  post, user, fetchCommunity, fetchPost,
}) {
  const [text, setText] = useState('');
  const toast = useToast();

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const handleSubmitComment = async () => {
    // setIsLoading(true);
    CommentsService.comment(post[0].id, user.id, text).then((res) => {
      // setIsLoading(false);
      // setText('');

      // eslint-disable-next-line no-unused-expressions
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

      fetchCommunity(post[0].community_id);
      fetchPost(post[0].id);
      setText('');
    });
  };

  const handleOnClickComment = () => {
    if (!user) {
      return toast({
        title: 'Usuario não logado.',
        description: 'Necessario estar logado.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    return handleSubmitComment();
  };

  return (
    <>
      <Box
        maxW="800px"
        margin="0 auto"
        rounded="lg"
        overflow="hidden"
        backgroundColor="white"
        padding="8px"
        marginY="16px"
      >
        <InputGroup size="md">
          <Textarea
            pr="4.5rem"
            type="text"
            placeholder="Digite seu comentário"
            value={text}
            onChange={handleChangeText}
          />
          <InputRightElement width="4.5rem" height="100%">
            <IconButton
              aria-label="Send commnent"
              icon={MdSend}
              onClick={handleOnClickComment}
              width="100%"
              height="100%"
            />
          </InputRightElement>
        </InputGroup>
      </Box>

      {post[0].commentsArray.map((comment) => (
        <Box
          maxW="800px"
          margin="0 auto"
          rounded="lg"
          overflow="hidden"
          backgroundColor="white"
          padding="8px"
          marginY="16px"
          display="flex"
          key={`commnet-${comment.id}`}
        >
          <Box>
            <Box size="56px">
              <Image
                objectFit="cover"
                src="https://bit.ly/sage-adebayo"
                alt="Segun Adebayo"
                rounded="8px"
              />
            </Box>
            <Text textAlign="center" color="Gray">
              {comment.user.name}
            </Text>
          </Box>
          <Box
            margin="8px"
            padding="8px"
            width="100%"
            borderWidth="1px"
            borderColor="Gray.800"
            borderRadius="4px"
          >
            <Text color="Gray">{comment.text}</Text>
          </Box>
        </Box>
      ))}
    </>
  );
}

const mapStateToProps = ({ user, post }) => ({
  user: user.user,
  post,
});

const mapDispatchToProps = {
  fetchCommunity,
  fetchPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
