import socketIo from 'socket.io'
import Server from '@ioc:Adonis/Core/Server'

export default new socketIo.Server(Server.instance!)
