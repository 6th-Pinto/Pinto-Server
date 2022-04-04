import express, { Application } from 'express';
import { Server } from 'socket.io';
import http from 'http';

import config from './config';
import loadApp from './loaders';

const startServer = async () => {
  const app: Application = express();

  await loadApp(app);
  const httpServer = http.createServer(app);
  const ioServer = new Server(httpServer);
  ioServer.on('connection', socket => {
    console.log('socket server is running');
    socket.on('join_room', roomName => {
      socket.join(roomName);
      socket.to(roomName).emit('welcome');
    });
    socket.on('offer', (offer, roomName) => {
      socket.to(roomName).emit('offer', offer);
    });
    socket.on('answer', (answer, roomName) => {
      socket.to(roomName).emit('answer', answer);
    });
    socket.on('ice', (ice, roomName) => {
      socket.to(roomName).emit('ice', ice);
    });
  });
  httpServer.listen(config.port);
};

startServer()
  .then(() => console.log(`Server Run on ${config.port}`))
  .catch(e => {
    console.error('Server Run Failed');
    console.error(e);
    process.exit(1);
  });
