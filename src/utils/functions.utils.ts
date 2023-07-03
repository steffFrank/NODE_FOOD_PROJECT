import fs from "fs/promises";
import { Server } from "http";
import { Request } from "express";

export const normalizePort = (val: string): string | number  => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0 && port <= 65535) {
    return port;
  }

  throw new RangeError(`Port number is outside the rande of valid TCP/UDP ports (0-65535)`);
};

export const serverErrorHandler = (error:NodeJS.ErrnoException, port: string | number, server: Server) : void => {
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
};


export const removeImageFromPath = async (path: string, filename: string): Promise<void> => {
  await fs.unlink(`${path}/${filename}`);
};

export const checkArrayValues = (arrayToCheck: Array<string>, targetArray: Array<string>): boolean => {
  return arrayToCheck.every((element) => targetArray.includes(element));
};


export const getImageUrl = (req: Request, imagePath:string): string | null => {
  if (!req.file) {
    console.error("No file provided in the request");
    return null;
  }

  const protocol = req.protocol;
  const host = req.get("host");
  const filename = req.file.filename;

  if (!protocol || !host || !filename) {
    console.error("Missing necessary request properties");
    return null;
  }

  return `${protocol}://${host}/${imagePath}/${filename}`;
}
