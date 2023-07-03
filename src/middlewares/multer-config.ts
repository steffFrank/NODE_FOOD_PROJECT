import multer, { StorageEngine } from "multer";

const MIME_TYPES: {[key: string]: string} = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png"
};

const storage: StorageEngine = multer.diskStorage({
    destination: (req: Express.Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => any) => {
        callback(null, "uploads");
    },
    filename: (req:Express.Request, file:Express.Multer.File, callback: (error: Error | null, destination: string) => any) => {

        const name: string = file.originalname.split(" ").join("_");
        const extension: string = MIME_TYPES[file.mimetype];
        
        callback(null, name.split("." + extension)[0] + "_" + Date.now() + "." + extension);
    }
});

export default multer({ storage: storage }).single("imageUrl");