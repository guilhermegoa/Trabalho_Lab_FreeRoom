import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Box, Text, Flex } from '@chakra-ui/core';
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
    <Flex flexWrap="wrap" justifyContent="center">
      {communities
      && communities.map((community) => (
        <Box
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          overflow="hidden"
          backgroundColor="#153E75"
          height="160px"
          width="160px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          margin="16px"
          padding="16px"
          cursor="pointer"
          onClick={() => handleOnClick(community.id)}
          key={`${community.name}_${community.id}`}
        >
          <Text
            textAlign="center"
            fontSize="lg"
            color="white"
          >
            {community.name}
          </Text>
          <Text
            textAlign="center"
            fontSize="sm"
            color="white"
            marginTop="8px"
          >
            {`Seguidores: ${community.followers}`}
          </Text>
        </Box>
      ))}

    </Flex>

  );
}

const mapStateToProps = ({ communities }) => ({
  communities,
});

const mapDispatchToProps = {
  fetchCommunities,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommunityList);
