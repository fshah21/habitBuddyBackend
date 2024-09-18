// import { Server } from 'socket.io';
// import http from 'http';
// import { db } from './index'; // Assuming Firestore is initialized in index.ts

// const server = http.createServer();
// const io = new Server(server, {
//   cors: {
//     origin: "*", // Adjust this according to your frontend domain
//     methods: ["GET", "POST"]
//   }
// });

// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   // Listen for joinRoom events
//   socket.on('joinRoom', ({ userId, matchedWithId }) => {
//     const room = getRoomId(userId, matchedWithId); // Room logic for unique room
//     socket.join(room);
//     console.log(`${userId} joined room: ${room}`);
//   });

//   // Listen for sendMessage events
//   socket.on('sendMessage', async ({ userId, matchedWithId, text, image }) => {
//     const room = getRoomId(userId, matchedWithId);
    
//     // Create a message object
//     const message = {
//       userId,
//       text,
//       image: image || null,
//       timestamp: new Date(),
//     };

//     // Store the message in Firestore
//     try {
//       await db.collection('messages').add({
//         roomId: room,
//         ...message
//       });

//       // Send the message to everyone in the room
//       io.to(room).emit('message', message);
//       console.log('Message sent to room:', room);
//     } catch (error) {
//       console.error('Error storing message:', error);
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('A user disconnected:', socket.id);
//   });
// });

// // Function to generate a unique room ID based on user IDs
// function getRoomId(userId: string, matchedWithId: string) {
//   return [userId, matchedWithId].sort().join('_');
// }

// export { server, io };
