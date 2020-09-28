import React from 'react';
import { MdAdd } from 'react-icons/md'

import { IconButton } from '@chakra-ui/core'


function ButtonCreatePost() {
  return (
    <IconButton
      variantColor="purple"
      aria-label="Postar"
      fontSize="40px"
      size="lg"
      isRound="true"
      icon={MdAdd}
      position="fixed"
      bottom="20px"
      right="20px"
    />
  )
}

export default ButtonCreatePost;
