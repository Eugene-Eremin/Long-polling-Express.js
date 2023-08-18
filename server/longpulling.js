const express = require('express')
const cors = require('cors')
const events = require('events')

const PORT = 5000

const emitter = new events.EventEmitter()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/get-message', (req, res) => {
    emitter.once('newMessage', (db) => {
        res.json(db)
    })
})

const db = []

app.post('/new-message', (req, res) => {
    console.log(db)
    const message = req.body
    console.log(message)
    db.push(message)
    emitter.emit('newMessage', db)
    res.status(200)
})

app.post('/my-message', (req, res) => {
    console.log(db)
    const message = req.body
    console.log(message)
    db.push(message)
    emitter.emit('newMessage', db)
    res.status(200)
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})