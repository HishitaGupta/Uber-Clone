const { Server } = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("join", async (data) => {
        const { userId, userType } = data;

        console.log("User joined with id:", userId);
        

        if (userType === "user") {
          const user = await userModel.findByIdAndUpdate(userId,{socketId:socket.id});

        } else if (userType === "captain") {
          const captain = await captainModel.findByIdAndUpdate(userId,{socketId:socket.id});

        }
    
    })

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;

      console.log("Location update received from captain:", userId, location);
      

      if (!location || !location.type || !location.coordinates) {
        return socket.emit("error",{message:"Invalid location data received"});
      }

     

     
        await captainModel.findByIdAndUpdate(userId,{location:{
            type:location.type,
            coordinates:location.coordinates
        }});
      });

      socket.on('new-ride', async (data) => {
        console.log("Ride from socket:", data);
      });
  

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

function sendMessageToSocketId(socketId, messageObject) {
  console.log("Sending message to socket:", socketId, messageObject);
  // console.log(io)
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.error("Socket.io is not initialized.");
  }
}

// function sendMessageToSocketId(socketId, messageObject) {
//   return new Promise((resolve, reject) => {
//     if (!io) {
//       reject(new Error("Socket.io is not initialized."));
//     } else {
//       io.to(socketId).emit(messageObject.event, messageObject.data);
//       resolve();
//     }
//   });
// }

module.exports = {
  initializeSocket,
  sendMessageToSocketId
};