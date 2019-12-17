//===CLIENT
const socket = io('http://localhost:3000') //script.js is our client, we call 3000 or the server to do something in it
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)

socket.on('user-connected', name => {
    appendMessage(`${name} is connected`)
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} is disconnected`)
})

socket.on('chat-message', ({ name, message }) => {
    appendMessage(`${name}: ${message}`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}