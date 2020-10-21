import React from 'react'

import { Flex, Spinner } from '@chakra-ui/core';

function Loading() {
  return (
    <Flex align="center" verticalAlign="center" height="100vh" width="100vw" justify="center" >
      <Spinner thickness="4px"
        speed="0.65s" size="xl" color="blue.800"
      />
    </Flex>
  )
}

export default Loading