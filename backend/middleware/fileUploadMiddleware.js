import multer, { memoryStorage } from 'multer';

// Set up multer storage and file filter
const storage = memoryStorage(); // Use memory storage for buffer

const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'), false);
  }
};

const fileUploadMiddleware = multer({
  storage: storage, // Use memory storage to get buffer
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
}).single('file'); // 'file' is the name of the field in the form

export default fileUploadMiddleware;