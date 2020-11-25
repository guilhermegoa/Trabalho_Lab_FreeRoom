import React from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Icon,
  DrawerOverlay,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  DrawerHeader,
  DrawerBody
} from '@chakra-ui/core'

function Notifications({ notifications, isOpen, onClose }) {
  const firstField = React.useRef()
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      initialFocusRef={firstField}
      onClose={onClose}
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px"> Notificações </DrawerHeader>

          <DrawerBody overflow="auto">
            <Stack spacing="15px">
              {[...notifications].reverse().map(notification => {
                return (
                  <Box
                    d="flex"
                    justifyContent={'space-between'}
                    key={notification.id}
                    bg={notification.is_new ? 'tomato' : null}
                    color={notification.is_new ? 'white' : null}
                    padding="1em"
                  >
                    <p>{notification.text}</p>

                    {notification.post_id ? (
                      <Link to={`/post/${notification.post_id}`}>
                        <Icon
                          name="external-link"
                          color="blue.500"
                          cursor="pointer"
                        />
                      </Link>
                    ) : null}
                  </Box>
                )
              })}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default Notifications
