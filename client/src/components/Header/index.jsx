import React from 'react';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Box,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  Button,
} from '@chakra-ui/core';

function Header() {
  return (
    <>
      <Box
        as="header"
        position="fixed"
        backgroundColor="#1A365D"
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        padding="0 32px"
        width="100vw"
        height="56px"
        zIndex="10"
      >
        <Box marginRight="16px">
          <Text color="white">FREEROOM</Text>
        </Box>
        <Box marginRight="16px">
          <InputGroup size="md">
            <InputLeftElement>
              <Icon name="search" color="blue.500" />
            </InputLeftElement>
            <Input minWidth={['xs', 'sm', 'md', 'lg', 'xl']} type="phone" placeholder="Phone number" />
          </InputGroup>
        </Box>
        <Box>
          <Menu>
            <MenuButton
              px={4}
              py={2}
              transition="all 0.2s"
              rounded="md"
              borderWidth="1px"
              backgroundColor="#E2E8F0"
              _focus={{ outline: 0, boxShadow: 'outline' }}
            >
              Menu
              {' '}
              <Icon name="chevron-down" />
            </MenuButton>
            <MenuList backgroundColor="#E2E8F0">
              <MenuItem>New File</MenuItem>
              <MenuItem>New Window</MenuItem>
              <MenuDivider />
              <MenuItem>Open...</MenuItem>
              <MenuItem>Save File</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Box>
          <Button marginRight="16px">
            <Text textAlign="center">Login</Text>
          </Button>
          <Button>
            <Text textAlign="center">Registrar</Text>
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Header;
