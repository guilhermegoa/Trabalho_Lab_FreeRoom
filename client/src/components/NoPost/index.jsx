import React from 'react';

import {
  Box,
} from '@chakra-ui/core';

function PostCard() {
  return (
    <Box borderWidth="1px" rounded="lg" overflow="hidden">
      <Box p="6">
        <Box
          mt="5"
          fontWeight="semibold"
          lineHeight="tight"
          isTruncated
        >
          Nenhum Post foi encontrado
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
          Seja o primeiro a publicar!
        </Box>
      </Box>
    </Box>
  );
}

export default PostCard;
