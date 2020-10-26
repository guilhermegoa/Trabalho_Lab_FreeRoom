import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Box, Text, Avatar } from '@chakra-ui/core';
import { fetchCommunities } from '../../redux/ducks/communities';

function CommunityList({ communities, fetchCommunities }) {
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
          onClick={() => handleOnClick(community.id)}
          key={`${community.name}_${community.id}`}
        >
          <Box>
            <Avatar size="2xl" name="Segun Adebayo" src={community.image_url} />
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
            <Text
              fontSize="sm"
            >
              {`Seguidores: ${community.followers}`}
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

export default connect(mapStateToProps, mapDispatchToProps)(CommunityList);
