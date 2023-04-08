import fs from "fs/promises";
//Utility functions

/**
 * Normalizes a value to use as a port
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
 * Handles errors for server listen
 * @param {Error} error - The error object 
 * @param {String | Number} port - The port number or name the server is listening on
 */
export const serverErrorHandler = (error, port, server) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === "string" ? "pipe " + address : "PORT " + port;
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

/**
 * Removes the image from the path
 * @param {String} path - local path where to remove the image
 * @param {String} filename - name of the image to remove
 */
export const removeImageFromPath = async (path, filename) => {
    await fs.unlink(`${path}/${filename}`); // Remove the image
}

/**
 * Check if all the values in arrayToCheck exist in arr
 * @param {Array} arrayToCheck - array of string to check
 * @param {Array} arr - array of string where to check
 * @returns {Boolean} - true if all the values in arrayToCheck exist in arr
 */
export const checkArrayValues = (arrayToCheck, arr) => {
    return arrayToCheck.every(val => arr.includes(val));
}