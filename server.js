const PORT = process.env.PORT || 5000;
const PORT_DEBUG = 9222;
const ENV = process.env.ENV || "development";

const http = require('http');
const io = require('socket.io')();

const server = http.createServer().listen(PORT);

io.listen(server);
console.log("SERVER RUN", PORT, ENV);

var USERSOCK = {
    user1: false,
    user2: false
};

io.sockets.on('connection', (socket) => {
    console.log("USER CONNECTED");

    var username = socket.handshake.query.username || false;
    if (!username) {
        socket.disconnect();
        return;
    }
    socket.username = username;
    USERSOCK[username] = socket;
    
    socket.on('message', async function (event) {

        var data = JSON.parse(event);
        console.log(event)

        switch (data.ev) {
            case "offer":
                if (USERSOCK.user2) {
                    USERSOCK.user2.emit('message', JSON.stringify({
                        ev: 'offer_4u',
                        offer: data.offer
                    }));
                }
                break;
            case "answer":
                if (USERSOCK.user1) {
                    USERSOCK.user1.emit('message', JSON.stringify({
                        ev: 'answer_4u',
                        answer: data.answer
                    }));
                }
                break;
            case "candidate":
                USERSOCK[socket.username === 'user1' ? 'user2' : 'user1'].emit('message', JSON.stringify({
                    ev: 'candidate_4u',
                    candidate: data.candidate
                }));
                break;
        }
    });
});
