import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import route from './Routes/index';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import { customError, errorHandler } from './middleware/errorHandler';
dotenv.config();

// env variable
const MONGO_CONNECT = process.env.MONGO_STRING;
const PORT = process.env.PORT;
const SECRET = process.env.SECRET;
const app = express();

// session store in mongo connect
const mongoStoreOptions = {
  mongoUrl: MONGO_CONNECT,
  collectionName: 'session',
  ttl: 60 * 60 * 60,
};

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 60 },
    store: MongoStore.create(mongoStoreOptions),
  })
);

// passport initialise
app.use(passport.initialize());
app.use(passport.session());

// Route
app.use('/', route);

// database connection
export const DB = mongoose
  .connect(MONGO_CONNECT)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running in http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    throw new customError(500, 'server Down');
  });

// error handler
app.use(errorHandler);
