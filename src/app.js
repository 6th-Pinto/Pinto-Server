const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3000;
const app = express();

const ForbiddenException = require('./exceptions/Forbidden');

require('dotenv').config();

const corsOptions = {
  origin: '*',
  method: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(morgan('dev'));

app.set('jwt-secret', process.env.JWT_SECRET);

app.get('/', (_req, res) => {
  res.json('express-starter');
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Connected to Database');
  })
  .catch(err => {
    console.error(err);
  });

app.listen(PORT, () => {
  console.log('Listening on', PORT);
});
