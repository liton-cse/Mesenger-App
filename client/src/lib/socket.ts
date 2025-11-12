// src/lib/socket.ts
import { io, Socket } from "socket.io-client";

export const socket: Socket = io("http://10.10.7.102:5000/api/v1"); // Replace with your server URL
