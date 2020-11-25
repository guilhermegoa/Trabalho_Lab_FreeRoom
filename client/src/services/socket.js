import io from 'socket.io-client'

const baseURL = 'http://127.0.0.1:3333'

const socket = io(baseURL)
// socket.connect()

export default socket
