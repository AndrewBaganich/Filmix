import multer from "multer";
import path from "path";
import fs from "fs";
import { MAX_SIZE_AVATAR, MAX_SIZE_MOVIE, MAX_SIZE_POSTER } from "../config/uploadConfig.js";

const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

ensureDir("uploads/posters");
ensureDir("uploads/movies");
ensureDir("uploads/avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "posterFile") {
      cb(null, "uploads/posters");
    } else if (file.fieldname === "movieFile") {
      cb(null, "uploads/movies");
    } else if (file.fieldname === "avatarFile") {
      cb(null, "uploads/avatars");
    } else {
      cb(null, "uploads");
    }
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const uniqueName = `${Date.now()}-${baseName}${ext}`;
    cb(null, uniqueName);
  },
});

export const uploadToMemory = multer({
  storage,
  limits: {
    fileSize: Math.max(MAX_SIZE_POSTER, MAX_SIZE_MOVIE),
  },
}).fields([
  { name: "posterFile", maxCount: 1 },
  { name: "movieFile", maxCount: 1 },
]);

export const uploadToMemoryAvatar = multer({
  storage,
  limits: {
    fileSize: MAX_SIZE_AVATAR,
  },
}).single("avatarFile");
