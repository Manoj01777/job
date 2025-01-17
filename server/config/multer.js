import multer from 'multer';
import path from 'path';

// Set up storage and file filter for resume uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.pdf') {
            return cb(new Error('Only PDF files are allowed'));
        }
        cb(null, true);
    },
});

export default upload;
