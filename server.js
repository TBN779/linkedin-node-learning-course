let express = require('express')
let bodyParser = require('body-parser')
let app = express()
let http = require('http').Server(app)
let io = require('socket.io')(http)
let mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

let dbUrl = 'mongodb+srv://user:user@learning-node.gugqr.mongodb.net/learning-node-message'

let Message = mongoose.model('Message', {
    name: String, 
    message: String
})

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages)
    })  
})

app.get('/messages/:user', (req, res) => {
    let user = req.params.user;
    Message.find({name: user}, (err, messages) => {
        res.send(messages)
    })  
})

app.post('/messages', async (req, res) => {
    try {        
        var message = new Message(req.body)

        var savedMessage = await message.save()

        var censored = await Message.findOne({message: 'badword'})

        if(censored)
            await Message.deleteOne({_id: censored.id})
        else
            io.emit('message', req.body)
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
        return console.error(error)
    } finally {
        console.log('message post called')
    }
})

io.on('connection', (socket) => {
    console.log('user connected')
})

mongoose.connect(dbUrl, {useUnifiedTopology: true, useNewUrlParser: true}, (err) => {
    console.log('mongo db connection', err)
})

let server = http.listen(5000, () => {
    console.log("server is listening on port", server.address().port);
})