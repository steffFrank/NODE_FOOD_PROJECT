import http from "http";
import { app } from "./app.js";
import { normalizePort, serverErrorHandler } from "./utils/functions.utils.js";
import { mongoConnect } from "./utils/mongo.utils.js";

const PORT = normalizePort(process.env.PORT || "5000");
app.set(PORT);

// Creates the server
const server = http.createServer(app);

// Handles Errors
server.on("error", error => {
    serverErrorHandler(error, PORT, server);
});

// Defines log message when server is listening
server.on("listening", () => {
    const address = server.address();
    const bind = typeof address === "string" ? "pipe " + address : "PORT " + PORT;
    console.log("Listening on " + bind);
});

// Starts the server
const startServer = async () => {
    await mongoConnect();
    server.listen(PORT);
}

startServer();