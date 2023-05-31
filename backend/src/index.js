import "dotenv/config.js";
import express from "express";
import * as path from 'path';
import { __dirname } from "./path.js";
import {engine} from 'express-handlebars'
import cookieParser from "cookie-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import initializePassport from './config/passport.js'
import routerUser from "./routes/userRoutes.js";
import routerProduct from "./routes/productRoutes.js";
import routerCart from "./routes/cartRoutes.js";
import routerSession from "./routes/sessionRoutes.js";
import routerGithub from "./routes/githubRoutes.js";
import routerChat from "./routes/chatRoutes.js";
import routerViews from "./routes/hbsviewsRoutes.js";
import routerMocking from "./routes/mockingRoutes.js";
import {Server} from 'socket.io'
import { createMessage } from "./services/messageService.js";
import { addLogger } from "./utils/logger.js";


//Express execution
const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(addLogger)
app.use(
  session({
    //Saves the session into the DB collection => Sessions
    store: MongoStore.create({
      mongoUrl: process.env.URLMONGODB,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 3600
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
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Port Setting
app.set("port", process.env.PORT || 8080);
//Server run:
const server = app.listen(app.get("port"), () => {
  console.log(`Server running on Port: ${app.get("port")}`);
});

//HBS Engine settings:
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

//Routes
app.use("/", express.static(__dirname + "/public"));
app.use('/user', routerUser)
app.use('/product', routerProduct)
app.use('/cart', routerCart)
app.use('/session', routerSession)
app.use('/github', routerGithub)
app.use('/chat', routerChat)
app.use("/", routerViews)
app.use("/mocking", routerMocking)

//Socket IO
export const io = new Server(server)
let messagesArr = []
io.on("connection", async (socket) => {
  console.log("Socket connected");
  socket.emit("allMessages", messagesArr);
  socket.on("message", async (info) => {
    await createMessage(info);
    messagesArr.push(info);
    io.emit("allMessages", messagesArr);
  });
  socket.on("emptyArr", (info) => {
    messagesArr = info;
    io.emit("allMessages", info);
  });
});