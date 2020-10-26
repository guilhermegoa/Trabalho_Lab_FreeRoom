import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Box,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  Avatar,
  Button,
} from '@chakra-ui/core';
import Register from './Modais/Register';
import Login from './Modais/Login';
import { userLogout } from '../../redux/ducks/user';

function Header({ isLogged, userLogout }) {
  const history = useHistory();

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
          <InputGroup size="md">
            <InputLeftElement>
              <Icon name="search" color="blue.500" />
            </InputLeftElement>
            <Input minWidth={['xs', 'sm', 'md', 'lg', 'xl']} type="phone" placeholder="Phone number" />
          </InputGroup>
        </Box>
        {isLogged ? (
          <>
            <Box>
              <Avatar
                size="md"
                name="Segun Adebayo"
              />
            </Box>
            <Button onClick={userLogout}>
              <Text textAlign="center">Sair</Text>
            </Button>
          </>
        )
          : (
            <>
              <Box>
                <Login />
              </Box>
              <Box>
                <Register />
              </Box>
            </>
          )}

      </Box>
    </>
  );
}

const mapStateToProps = ({ user }) => ({
  user: user.user,
  isLogged: user.isLogged,

});

const mapDispatchToProps = {
  userLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
