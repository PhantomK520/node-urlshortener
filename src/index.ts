import dotenv from "dotenv";

import express from "express";
import { URLStoreController } from "./controller";
import helmet from "helmet";
import cors from "express";
import http from "http";
import chalk from "chalk";
import {  connect } from "mongoose";

(async () => {
  dotenv.config();
  const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  };
  await connect(process.env.DB_URL as string, options);

  const app = express();

  const router = express.Router();

  app.use(express.json());

  app.use(cors());

  app.use(helmet());

  app.use(router);

  new URLStoreController(router).initController();

  const port = process.env.PORT;

  const server = http.createServer(app);

  const onListen = () => {
    console.log(chalk.green("Server is Listening @ Port " + port));
  };
  const onError = (error: any) => {
    if (error.syscall !== "listen") {
      throw error;
    }

    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    switch (error.code) {
      case "EACCES":
        console.log(chalk.red(bind + " requires elevated privileges"));
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.log(chalk.red(bind + " is already in use"));
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListen);
})();
