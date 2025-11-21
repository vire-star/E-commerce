import multer from "multer";

const storage = multer.memoryStorage(); // file buffer me aayegi

export const upload = multer({ storage });
