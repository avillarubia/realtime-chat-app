const io = require('socket.io')(3000)

const users = {}

io.on('connection', socket => {
    //socket.emit('chat-message', 'Hello World') //send to clients
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })

    socket.on('send-chat-message', message => {
        const payload = { name: users[socket.id], message }
        socket.broadcast.emit('chat-message', payload) //send to all clients except the client sender
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})