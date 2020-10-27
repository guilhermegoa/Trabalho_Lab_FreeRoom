import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
} from '@chakra-ui/core';
import Register from './Modais/Register';
import Login from './Modais/Login';

function Header() {
  const history = useHistory();

  const [search, setSearch] = useState('')

  const searchPost = () => {
    history.push(`/posts/${search}`)
  }

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
          <Text
            color="white"
            onClick={() => history.push('/')}
            cursor="pointer"
          >
            FREEROOM
          </Text>
        </Box>
        <Box marginRight="16px">
          <form onSubmit={searchPost}>
            <InputGroup size="md">
              <InputLeftElement>
                <Icon name="search" color="blue.500" cursor='pointer' onClick={searchPost} />
              </InputLeftElement>
              <Input onChange={(e) => { setSearch(e.target.value) }} minWidth={['xs', 'sm', 'md', 'lg', 'xl']} type="text" placeholder="Pesquisar post" />
            </InputGroup>
          </form>
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
          <Login />
        </Box>
        <Box>
          <Register />
        </Box>

      </Box>
    </>
  );
}

export default Header;
