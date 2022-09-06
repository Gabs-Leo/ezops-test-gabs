const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
let http = require('http').Server(app)
const server = app.listen(3001, () => console.log("Rodando!"));
let io = require('socket.io')(http);

//Express Configuration
app.use(express.static(__dirname));

//Mongoose and Database Connection
const DATABASE_URL = "mongodb+srv://gabs:pass@ezops-test-gabs.n85lhdo.mongodb.net/?retryWrites=true&w=majority"

const Message = mongoose.model("Message", {
    name: String, message:String
});

//BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Routes
app.get("/messages", (request, response) => {
    Message.find({}, (error, messages) => {
        response.send(messages);
    })
})

app.post("/messages", (request, response) => {
    const message = new Message(request.body);
    message.save((error) => {
        if(error) {
            sendStatus(500);
        } else {
            io.emit('message', request.body);
            response.sendStatus(200);
        };
    })
})

io.on('connection', () => {
    console.log("Usuário conectado!")
})

mongoose.connect(DATABASE_URL, (error) => console.log("Conectado!"));



