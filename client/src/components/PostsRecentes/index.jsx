import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Text, Avatar } from '@chakra-ui/core';
import api from '../../services/api';

function CommunityList() {
  const [recentPosts, setRecentPosts] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (!recentPosts) {
      api.get('/recentposts').then((res) => setRecentPosts(res.data));
    }
  }, []);

  const handleOnClick = (post) => {
    history.push(`/communities/${post.community.id}/posts/${post.id}`);
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
        Recentes
      </Text>
      {recentPosts
      && recentPosts.map((post) => (
        <Box
          borderWidth="1px"
          overflow="hidden"
          backgroundColor="white"
          height="120px"
          width="400px"
          display="flex"
          padding="16px"
          borderLeft="4px"
          borderLeftColor={post.community.color}
          cursor="pointer"
          onClick={() => handleOnClick(post)}
          key={`${post.name}_${post.id}`}
        >
          <Box>
            <Avatar size="lg" name="Segun Adebayo" src={post.image_url} />
          </Box>
          <Box marginLeft="16px">
            <Text
              fontSize="xl"
              marginBottom="8px"
              fontWeight="bold"
            >
              {post.title}
            </Text>
            <Text
              fontSize="sm"
            >
              {post.content}
            </Text>
            <Text
              fontSize="sm"
            >
              {`Comentários: ${post.comments}`}
            </Text>
          </Box>
        </Box>
      ))}

    </Box>

  );
}

export default CommunityList;
