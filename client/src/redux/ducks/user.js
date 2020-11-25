import api from '../../services/api'
import { setToken, clearToken } from '../../services/auth'

// Action Types

export const Types = {
  LOGIN: 'auth/LOGIN',
  LOGOUT: 'auth/LOGOUT',
  VALIDTOKEN: 'auth/VALIDTOKEN',
  FETCH: 'users/fetch',
  NOTIFICATIONS_READED: 'users/notifications-read',
  ACTIVATED_NOTIFICATIONS: 'users/activatedNotifications',
  MUTED_NOTIFICATIONS: 'users/mutedNotifications'
}

// Reducer

const initialState = {
  isLogged: false,
  isValidToken: false,
  user: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.LOGIN:
      return {
        ...state,
        isLogged: true,
        isValidToken: true
      }
    case Types.LOGOUT:
      return { ...initialState }
    case Types.FETCH:
      return {
        ...state,
        user: action.payload
      }
    case Types.VALIDTOKEN:
      return {
        ...state,
        isValidToken: true
      }
    case Types.NOTIFICATIONS_READED:
      const newUser = { ...state.user }
      newUser.notifications = newUser.notifications.map(item => ({
        ...item,
        is_new: false
      }))
      return {
        ...state,
        user: newUser
      }
    case Types.MUTED_NOTIFICATIONS:
      const newUserMuted = { ...state.user }
      newUserMuted.postAlerts = newUserMuted.postAlerts.filter(
        item => item !== action.payload.post_id
      )
      return {
        ...state,
        user: newUserMuted
      }
    case Types.ACTIVATED_NOTIFICATIONS:
      const newUserActive = { ...state.user }
      newUserActive.postAlerts.push(action.payload.post_id)
      return {
        ...state,
        user: newUserActive
      }
    default:
      return state
  }
}

// Action Creators

const loginUser = () => ({ type: Types.LOGIN })

const logoutUser = () => ({ type: Types.LOGOUT })

const validToken = () => ({ type: Types.VALIDTOKEN })

const userFetched = data => ({ type: Types.FETCH, payload: data })

const notificationReaded = () => ({
  type: Types.NOTIFICATIONS_READED
})

const activatedNotifications = post_id => ({
  type: Types.ACTIVATED_NOTIFICATIONS,
  payload: { post_id }
})

const mutedPost = post_id => ({
  type: Types.MUTED_NOTIFICATIONS,
  payload: { post_id }
})

// Thunk

export const userLogged = () => dispatch => dispatch(loginUser())

export const tokenValid = () => dispatch => dispatch(validToken())

export const retriveUser = () => dispatch =>
  api.get('/retriveuser').then(({ data }) => {
    dispatch(userFetched(data))
    dispatch(loginUser())
  })

export const userLogin = dataLogin => dispatch =>
  api.post('/login', dataLogin).then(({ data }) => {
    setToken(data)
    dispatch(loginUser())
  })

export const userLogout = () => dispatch =>
  api.get('/logout').then(() => {
    clearToken()
    dispatch(logoutUser())
  })

export const fetchUser = id => dispatch =>
  api.get(`/users/${id}`).then(({ data }) => {
    return dispatch(userFetched(data))
  })

export const validedToken = () => dispatch => {
  api
    .get('checktoken')
    .then(res => {
      if (res?.data === true) {
        dispatch(userLogged())
        dispatch(retriveUser())
        dispatch(tokenValid())
      }
    })
    .catch(() => {
      clearToken()
    })
}

export const updateLogin = (id, data) => dispatch =>
  api
    .post(`/users/update/${id}`, data)
    .then(res => dispatch(userFetched(res.data)))

export const markAllNotificationAsRead = id => dispatch =>
  api
    .put(`/notifications/read/${id}`)
    .then(() => dispatch(notificationReaded()))

export const activeNotifications = ({ post_id, user_id }) => dispatch =>
  api
    .post(`/posts/registerAlert`, { post_id, user_id })
    .then(() => dispatch(activatedNotifications(post_id)))

export const mutePost = ({ post_id, user_id }) => dispatch =>
  api
    .delete(`/posts/registerAlert/post/${post_id}/user/${user_id}`)
    .then(() => dispatch(mutedPost(post_id)))
