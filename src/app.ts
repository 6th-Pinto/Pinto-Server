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
