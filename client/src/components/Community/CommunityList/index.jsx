import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Box, Text, Image, Button, useToast } from '@chakra-ui/core'
import { fetchCommunities } from '../../../redux/ducks/communities'
import { retriveUser } from '../../../redux/ducks/user'
import api from '../../../services/api'
import { FiUsers } from 'react-icons/fi'

function CommunityList({
  retriveUser,
  communities,
  fetchCommunities,
  user,
  isLogged
}) {
  const getCommunities = useCallback(fetchCommunities, [])
  const toast = useToast()

  useEffect(() => {
    if (!communities) {
      getCommunities()
    }
  }, [communities, getCommunities])

  const handleFollowCommunity = async community_id => {
    if (isLogged) {
      await api.post('/followcommunity', {
        user_id: user.id,
        community_id
      })
      getCommunities()
      return retriveUser()
    }

    return toast({
      title: 'Usuario não logado.',
      description: 'Necessario estar logado.',
      status: 'error',
      duration: 5000,
      isClosable: true
    })
  }

  const handleUnfollowCommunity = async community_id => {
    await api.post('/unfollowcommunity', {
      user_id: user.id,
      community_id
    })
    getCommunities()
    return retriveUser()
  }

  const handleButton = community_id => {
    if (isLogged && community_id) {
      if (user && user?.user_community?.includes(community_id)) {
        return (
          <Button
            backgroundColor="#A0AEC0"
            _hover={{ background: '#153E75' }}
            onClick={() => handleUnfollowCommunity(community_id)}
          >
            <Text color="white" textAlign="center">
              parar de seguir
            </Text>
          </Button>
        )
      }
    }

    return (
      <Button
        backgroundColor="#A0AEC0"
        _hover={{ background: '#153E75' }}
        onClick={() => handleFollowCommunity(community_id)}
      >
        <Text color="white" textAlign="center">
          seguir ...
        </Text>
      </Button>
    )
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      overflow="hidden"
      marginRight="8px"
    >
      <Text fontSize="2xl" backgroundColor="white" paddingLeft="8px">
        Categorias
      </Text>
      {communities ? (
        communities.map(community => (
          <Box
            borderWidth="1px"
            overflow="hidden"
            backgroundColor="white"
            height="168px"
            width="600px"
            display="flex"
            padding="16px"
            borderLeft="4px"
            borderLeftColor={community.color}
            marginBottom="8px"
            key={`${community.name}_${community.id}`}
          >
            <Box size="320px">
              <Link to={`/communities/${community.id}`}>
                <Image
                  objectFit="fill"
                  rounded="8px"
                  name={community.name}
                  src={community.image_url}
                />
              </Link>
            </Box>
            <Box marginLeft="16px" width="100%">
              <Link to={`/communities/${community.id}`}>
                <Text fontSize="xl" marginBottom="8px" fontWeight="bold">
                  {community.name}
                </Text>
                <Text fontSize="sm">
                  {community.description.length > 100
                    ? community.description.substring(0, 97) + '...'
                    : community.description}
                </Text>
              </Link>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginTop="16px"
              >
                <Box display="flex" alignItems="center">
                  <FiUsers />
                  <Text marginLeft="8px">{community.followers}</Text>
                </Box>
                {handleButton(community.id)}
              </Box>
            </Box>
          </Box>
        ))
      ) : (
        <Box
          borderWidth="1px"
          overflow="hidden"
          backgroundColor="white"
          height="160px"
          width="600px"
          display="flex"
          padding="16px"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="24px" fontWeight="bold">
            Comunidades não encontarada
          </Text>
        </Box>
      )}
    </Box>
  )
}

const mapStateToProps = ({ communities, user }) => ({
  communities,
  user: user.user,
  isLogged: user.isLogged
})

const mapDispatchToProps = {
  fetchCommunities,
  retriveUser
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityList)
