import React from 'react';

import {
  Box,
  Grid,
  Avatar,
  Drawer,
  DrawerBody,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from '@chakra-ui/core';

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" h="300px" gap={1} bg="blue.500">
        <Box w="100%" h="100%" display="flex" alignItems="space-between" justifyContent="flex-start" pt="30px" pl="20px">
          <Button ref={btnRef} variantColor="teal" onClick={onOpen}>
            =
          </Button>
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerBody />
            </DrawerContent>
          </Drawer>
          <Box>
            <h1>Olá Goa</h1>
            <h3>Encontra topicos que você gosta de ler</h3>
          </Box>
        </Box>
        <Box w="100%" h="100%" display="flex" justifyContent="flex-end" p="20px">
          <Avatar size="lg" name="Ryan Florence" src="https://bit.ly/ryan-florence" />
        </Box>
      </Grid>
    </>
  );
}

export default Header;
