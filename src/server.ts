import fs from "fs";
import https from "https";
import { app } from "./app";
import { Server } from "http";
import { mongoConnect } from "./utils/mongo.utils";
import { normalizePort, serverErrorHandler } from "./utils/functions.utils";

const PORT: string | number | boolean = normalizePort(process.env.PORT || "5000");
app.set("port", PORT);

const server: Server = https.createServer({
    cert: fs.readFileSync("cert.pem"),
    key: fs.readFileSync("key.pem")
}, app);

server.on("error", (error: NodeJS.ErrnoException) => {
    serverErrorHandler(error, PORT, server);
});

// Defines log message when server is listening
server.on("listening", () => {
    const address = server.address();
    const bind = typeof address === "string" ? "pipe " + address : "PORT " + PORT;
    console.log("Listening on " + bind);
});


const startServer = async () => {
    await mongoConnect();
    server.listen(PORT);
}

startServer();