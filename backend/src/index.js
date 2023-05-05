import "dotenv/config.js";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import initializePassport from './config/passport.js'
import routerUser from "./routes/userRoutes.js";
import routerProduct from "./routes/productRoutes.js";
import routerCart from "./routes/cartRoutes.js";

//Express execution
const app = express();

//Frontend Connection (Cors)
const whiteList = ["http://localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by Cors"));
    }
  },
};

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors(corsOptions));
app.use(
  session({
    //Saves the session into the DB collection => Sessions
    store: MongoStore.create({
      mongoUrl: process.env.URLMONGODB,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 360,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true, //Allows to close or refresh and keep active session
    saveUninitialized: true, //Saves session even without changes
  })
);

//MongoAtlas Connection
const mongooseConnection = async () => {
  await mongoose
    .connect(process.env.URLMONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((error) => console.log(error));
};
mongooseConnection();

//Passport
app.use(passport.initialize());
initializePassport();
app.use(passport.session());

//Port Setting
app.set("port", process.env.PORT || 8080);
//Server run:
export const server = app.listen(app.get("port"), () => {
  console.log(`Server running on Port: ${app.get("port")}`);
});

//Routes
app.use('/user', routerUser)
app.use('/product', routerProduct)
app.use('/cart', routerCart)