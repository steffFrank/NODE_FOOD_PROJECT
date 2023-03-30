//Utility functions

/**
 * Normalize a value to use as a port
 * @param {String} val - the value to normalize
 * @returns {String | Number | Boolean}
 */
export const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0 && port <= 65535) {
        return port;
    }

    return false;
}

/**
 * Handle errors for server listen
 * @param {Error} error - The error object 
 * @param {String | Number} port - The port number or name the server is listening on
 */
export const serverErrorHandler = (error, port, server) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === "string" ? "pipe " + address : "PORT" + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges.");
            process.exit(1);
        case "EADDRINUSE":
            console.error(bind + " is already in use.");
            process.exit(1);
        default:
            throw error;
    }
}