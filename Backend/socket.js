import {Server} from 'socket.io'
import Captain from "./models/captain.model.js";
import User from './models/user.model.js'

let io ;

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: [ 'GET', 'POST' ]
        }
    })

    io.on('connection', (socket) => {
        console.log(`Client connected : ${socket.id}`);

         socket.on('join', async (data) => {
            const { userId, userType } = data;

            if(userType === 'user'){
                await User.findByIdAndUpdate(userId , {socketId : socket.id})
            }else{
                await Captain.findByIdAndUpdate(userId, {socketId : socket.id})
            }
        });

        
        socket.on('disconnect', () => {
            console.log(`Client dis-connected : ${socket.id}`);
        })
    })


}

const sendMessageToSocketId = (socketId, messageObject) => {
    // console.log(messageObject);

    if(io) {
        io.to(socketId).emit(messageObject.event, messageObject.data)
    }else{
        console.log('Socket.io not initialized.');
    }
}

export {
    initializeSocket,
    io,
    sendMessageToSocketId
}