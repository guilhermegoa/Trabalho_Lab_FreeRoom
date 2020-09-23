import React from 'react'

import { Box, Badge } from '@chakra-ui/core'

import { MdFavorite, MdModeComment } from "react-icons/md"


function getUserName() {
  return 'teste'
}

function PostCard({ post }) {
  console.log(post)

  const property = {
    title: post.title,
    content: post.content,
    created: post.created_data,
    likes: 0,
    comments: 0,
    user: getUserName(post.user)
  }

  return (
    <Box maxW="xl" borderWidth="1px" rounded="lg" overflow="hidden">
      {/* <Image src={property.imageUrl} alt={property.imageAlt} /> */}

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge rounded="full" px="2" variantColor="purple">
            {property.user}
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {property.likes} <Box display="inline" size="14px" as={MdFavorite} color="purple.800" />
            {property.comments} <Box display="inline" size="14px" as={MdModeComment} color="purple.800" />
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          lineHeight="tight"
          isTruncated
        >
          {property.title}
        </Box>

        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
          ml="2"
          isTruncated
        >
          {property.content}
        </Box>

      </Box>
    </Box>
  )
}

export default PostCard