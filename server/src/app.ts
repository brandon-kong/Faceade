import express from "express";
import cors, { CorsOptions } from "cors";

import type { Express } from "express";
import { createServer } from "http";
import { Server as SocketServer } from "socket.io";

import dotenv from "dotenv";
import { handleGameCreate } from "./socket-handlers/game";
import { handleSocketDisconnect } from "./socket-handlers";

// MongoDB

import connect, { getDatabase } from "./lib/db";

let database;

// Load environment variables

dotenv.config();

// CORS options

const corsOptions: CorsOptions = {
    origin: process.env.APPLICATION_ADDRESS as string,
    credentials: true,
    optionsSuccessStatus: 200,
};

const app: Express = express();
const server = createServer(app);
const io = new SocketServer(server, {
    cors: corsOptions,
});

app.use(cors(corsOptions));

// Connect to MongoDB

connect().then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});


const port: number = Number(process.env.PORT) || 4000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

io.on("connection", (socket) => {

    console.log(`a user connected from ${socket.handshake.address} `);
    const db = getDatabase();

    // Game events
    handleGameCreate(socket, db);

    // Socket events
    handleSocketDisconnect(socket, db);
});

server.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});