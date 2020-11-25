import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Box,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  Button,
  useDisclosure
} from '@chakra-ui/core'
import Register from './Modais/Register'
import Login from './Modais/Login'
import UpdateUser from './Modais/updateUser'
import {
  userLogout,
  retriveUser,
  markAllNotificationAsRead
} from '../../redux/ducks/user'
import socket from '../../services/socket'
import Notifications from './Modais/Notifications'

function Header({
  isLogged,
  userLogout,
  user,
  retriveUser,
  markAllNotificationAsRead
}) {
  const history = useHistory()

  const [search, setSearch] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [notifications, setNotifications] = useState(
    user ? user.notifications : []
  )

  const searchPost = () => {
    history.push(`/posts/${search}`)
  }

  useEffect(() => {
    if (user) {
      debugger
      socket.on(`new-notify-${user.id}`, data => {
        retriveUser()
      })
    }
    setNotifications(user ? user.notifications : [])
  }, [user, retriveUser])

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
                <Icon
                  name="search"
                  color="blue.500"
                  cursor="pointer"
                  onClick={searchPost}
                />
              </InputLeftElement>
              <Input
                onChange={e => {
                  setSearch(e.target.value)
                }}
                minWidth={['xs', 'sm', 'md', 'lg', 'xl']}
                type="text"
                placeholder="Pesquisar post"
              />
            </InputGroup>
          </form>
        </Box>
        {isLogged ? (
          <>
            <Box>
              {/* <Avatar
                size="md"
                name={user?.name}
                src={user?.avatar}
              /> */}
              <UpdateUser name={user?.name} src={user?.avatar} />
            </Box>

            <Icon
              name="bell"
              color={
                notifications.filter(notification => {
                  return notification.is_new
                }).length > 0
                  ? 'red.500'
                  : 'gray.100'
              }
              cursor="pointer"
              onClick={() => {
                onOpen()
              }}
              size="1.5em"
            />

            <Notifications
              notifications={notifications}
              isOpen={isOpen}
              onClose={() => {
                onClose()
                markAllNotificationAsRead(user.id)
              }}
            />

            <Button onClick={userLogout}>
              <Text textAlign="center">Sair</Text>
            </Button>
          </>
        ) : (
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
  )
}

const mapStateToProps = ({ user }) => ({
  user: user.user,
  isLogged: user.isLogged
})

const mapDispatchToProps = {
  userLogout,
  retriveUser,
  markAllNotificationAsRead
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
