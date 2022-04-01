import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import express, { Application } from 'express';

import morgan from 'morgan';
import routes from '../api';
import config from '../config';

export default (app: Application): void => {
  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, '/../views/'));
  app.use('/public', express.static(path.join(__dirname, '/../public')));
  app.get('/', (req, res) => res.render('home'));
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors(config.corsOptions));

  app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
  app.use(config.api.prefix, routes);
  // app.all('*', (req, res, _next) => {
  // res.status(404).send('404');
  // });
};
