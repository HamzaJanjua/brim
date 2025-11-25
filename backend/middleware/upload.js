// backend/middleware/upload.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// ✅ Fix: Resolve the absolute path to the 'backend' directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Go up one level from 'middleware' to 'backend' root, then into 'public/uploads'
const uploadDir = path.join(__dirname, '../public/uploads');

// Create the directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // ✅ Save to the absolute path
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

export const uploadProductImage = upload.single('image');
export const BASE_UPLOAD_PATH = '/public/uploads';