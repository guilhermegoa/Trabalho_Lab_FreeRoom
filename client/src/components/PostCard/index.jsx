import React from 'react';

import {
  Box, Tag, Avatar, Image,
} from '@chakra-ui/core';

import { MdFavorite, MdModeComment } from 'react-icons/md';

function PostCard({ post, image }) {
  const property = {
    title: post.title,
    content: post.content,
    created: post.created_data,
    likes: 0,
    comments: 0,
    user: post.user ? post.user.name : 'Desconhecido',
    image_url: image,
  };

  return (
    <Box borderWidth="1px" rounded="lg" overflow="hidden">

      {property.image_ulr
        ? <Image src={property.image_url} alt={property.title} />
        : <></>}

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Tag variantColor="purple" rounded="full">
            <Avatar
              src={property.image ? property.image : ''}
              size="xs"
              name={property.user}
              ml={-1}
              mr={2}
            />
            {property.user}
          </Tag>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {property.likes}
            {' '}
            <Box display="inline" size="14px" as={MdFavorite} color="purple.800" />
            {property.comments}
            {' '}
            <Box display="inline" size="14px" as={MdModeComment} color="purple.800" />
          </Box>
        </Box>

        <Box
          mt="5"
          fontWeight="semibold"
          lineHeight="tight"
          isTruncated
        >
          {property.title}
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
          {property.content}
        </Box>

      </Box>
    </Box>
  );
}

export default PostCard;
