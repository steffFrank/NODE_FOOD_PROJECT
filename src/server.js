import fs from "fs";
import https from "https";
import { app } from "./app.js";

import { mongoConnect } from "./utils/mongo.utils.js";
import { normalizePort, serverErrorHandler } from "./utils/functions.utils.js";

const PORT = normalizePort(process.env.PORT || "5000");
app.set(PORT);

const server = https.createServer({
    cert: fs.readFileSync("cert.pem"),
    key: fs.readFileSync("key.pem")
}, app);

server.on("error", error => {
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