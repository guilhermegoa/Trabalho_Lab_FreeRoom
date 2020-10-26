import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  Box, Text, Avatar, Button, useToast,
} from '@chakra-ui/core';
import { fetchCommunities } from '../../redux/ducks/communities';
import { retriveUser } from '../../redux/ducks/user';
import api from '../../services/api';

function CommunityList({
  retriveUser, communities, fetchCommunities, user, isLogged,
}) {
  const getCommunities = useCallback(fetchCommunities, []);
  const history = useHistory();
  const toast = useToast();

  useEffect(() => {
    if (!communities) {
      getCommunities();
    }
  }, [communities, getCommunities]);

  const handleOnClick = (id) => {
    history.push(`/communities/${id}`);
  };

  const handleFollowCommunity = async (community_id) => {
    if (isLogged) {
      await api.post('/followcommunity', {
        user_id: user.id,
        community_id,
      });
      return retriveUser();
    }

    return (
      toast({
        title: 'Usuario não logado.',
        description: 'Necessario estar logado.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    );
  };

  const handleUnfollowCommunity = async (community_id) => {
    await api.post('/unfollowcommunity', {
      user_id: user.id,
      community_id,
    });
    return retriveUser();
  };

  const handleButton = (community_id) => {
    if (isLogged) {
      if (user && user.user_community.includes(community_id)) {
        return (
          <Button
            backgroundColor="#A0AEC0"
            _hover={{ background: '#153E75' }}
            onClick={() => handleUnfollowCommunity(community_id)}
          >
            <Text color="white" textAlign="center">parar de seguir</Text>
          </Button>
        );
      }
    }

    return (
      <Button
        backgroundColor="#A0AEC0"
        _hover={{ background: '#153E75' }}
        onClick={() => handleFollowCommunity(community_id)}
      >
        <Text color="white" textAlign="center">seguir ...</Text>
      </Button>
    );
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      overflow="hidden"
      marginRight="8px"
    >
      <Text
        fontSize="2xl"
        backgroundColor="white"
        paddingLeft="8px"
      >
        Categorias
      </Text>
      {communities
      && communities.map((community) => (
        <Box
          borderWidth="1px"
          overflow="hidden"
          backgroundColor="white"
          height="160px"
          width="600px"
          display="flex"
          padding="16px"
          borderLeft="4px"
          borderLeftColor={community.color}
          cursor="pointer"
          marginBottom="8px"
          key={`${community.name}_${community.id}`}
        >
          <Box>
            <Avatar
              size="2xl"
              name="Segun Adebayo"
              src={community.image_url}
              onClick={() => handleOnClick(community.id)}
            />
          </Box>
          <Box marginLeft="16px" width="100%">
            <Text
              fontSize="xl"
              marginBottom="8px"
              fontWeight="bold"
              onClick={() => handleOnClick(community.id)}
            >
              {community.name}
            </Text>
            <Text
              fontSize="sm"
            >
              {community.description}
            </Text>
            <Text
              fontSize="sm"
            >
              {`Seguidores: ${community.followers}`}
            </Text>
            <Box display="flex" justifyContent="flex-end">
              {handleButton(community.id)}
            </Box>
          </Box>
        </Box>
      ))}

    </Box>

  );
}

const mapStateToProps = ({ communities, user }) => ({
  communities,
  user: user.user,
  isLogged: user.isLogged,
});

const mapDispatchToProps = {
  fetchCommunities,
  retriveUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommunityList);
