import multer from "multer";
import fs from "fs";
import { Request } from "express";

// Function to create the directory if it doesn't exist
const createDirectoryIfNotExists = (directoryPath) => {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
};

const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        const uploadPath = "public/images";
        createDirectoryIfNotExists(uploadPath);
        cb(null, uploadPath);
    },
    filename: (req: Request, file, cb) => {
        const fileName = `${Date.now()}${file.originalname}`;
        cb(null, fileName);
    },
});

const storage2 = multer.memoryStorage();

const fileFilter = (req: Request, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "application/pdf"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type"), false);
    }
};

const upload = multer({
  storage: storage2,
  limits: {
    fileSize: 1024 * 1024 * 20,
  },
  fileFilter,
});

export const uploadImage = (req, res, next) => {
  createDirectoryIfNotExists("public/images");
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    req.file.path = req.file.path.replace(/\\/g, "/");
    next();
  });
};

export const uploadFiles = (req, res, next) => {
  createDirectoryIfNotExists("public/images");
  upload.array("File", 10)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    req.files.forEach((file) => {
      file.path = file.path.replace(/\\/g, "/");
    });
    next();
  });
};

export const uploadFile = (req, res, next) => {
  upload.single("resume")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};
