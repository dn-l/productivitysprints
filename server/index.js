const path = require('path')
const logger = require('./logger')
const express = require('express')
const history = require('connect-history-api-fallback')
const app = express()
const http = require('http')
const socketio = require('socket.io')
const compression = require('compression')
const Store = require('./Store')
const Timer = require('./Timer')
const Users = require('./Users')
const server = http.Server(app)
const io = socketio(server)
const users = new Users(new Store('users'))
const timer = new Timer(new Store('timer'))
const PORT = process.env.PORT || 3000
const STATIC_ROOT = path.resolve(__dirname, '..', 'ui', 'dist')

app.use(compression())
app.use(express.json())
app.use('/', express.static(STATIC_ROOT))
app.use(history('index.html', { root: STATIC_ROOT }))

timer.subscribe(newState => {
  io.sockets.emit('currentState', { ...newState, timeLeft: newState.duration })
})

users.onCountChange(() => {
  io.sockets.emit('connectedUsersCount', users.count)
})

io.on('connection', socket => {
  users.add(socket.id)
  socket.emit('currentState', timer.currentState)
  socket.on('disconnect', () => {
    users.remove(socket.id)
  })
})

timer.start().then(() => {
  logger.info(`Server is running at port ${PORT}`)
  server.listen(PORT)
})

setTimeout(() => {
  debugger
}, 3000)
