import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import { instrument } from "@socket.io/admin-ui"; 
import Routes from "./routes/index.js";
import { setupSocket } from "./socket.js";

const app: Application = express();
const PORT = process.env.PORT || 7000;

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_APP_URL, "https://admin.socket.io"], 
  },
});

instrument(io, {
  auth: false,  
  mode: "development", 
});

export { io };
setupSocket(io);  

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  return res.send("It's working Guys 🙌");
});

app.use("/api", Routes);

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
