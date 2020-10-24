import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Box, Text, Avatar } from '@chakra-ui/core';
import { fetchCommunities } from '../../redux/ducks/communities';

function PostsRecentes({ communities, fetchCommunities }) {
  const getCommunities = useCallback(fetchCommunities, []);
  const history = useHistory();

  useEffect(() => {
    if (!communities) {
      getCommunities();
    }
  }, [communities, getCommunities]);

  const handleOnClick = (id) => {
    history.push(`/communities/${id}`);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      overflow="hidden"
    >
      <Text
        fontSize="2xl"
        backgroundColor="white"
        paddingLeft="8px"
      >
        Recentes
      </Text>
      {communities
      && communities.map((community) => (
        <Box
          borderWidth="1px"
          overflow="hidden"
          backgroundColor="white"
          height="120px"
          width="400px"
          display="flex"
          padding="16px"
          borderLeft="4px"
          borderLeftColor="Black"
          cursor="pointer"
          onClick={() => handleOnClick(community.id)}
          key={`${community.name}_${community.id}`}
        >
          <Box>
            <Avatar size="lg" name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
          </Box>
          <Box marginLeft="16px">
            <Text
              fontSize="xl"
              marginBottom="8px"
              fontWeight="bold"
            >
              {community.name}
            </Text>
            <Text
              fontSize="sm"
            >
              {community.description}
            </Text>
          </Box>
        </Box>
      ))}

    </Box>

  );
}

const mapStateToProps = ({ communities }) => ({
  communities,
});

const mapDispatchToProps = {
  fetchCommunities,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsRecentes);
