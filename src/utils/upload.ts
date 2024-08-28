import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder:string = 'public/';
        if (file.fieldname === 'projectImage') {
            folder += 'projects';
        } else if (file.fieldname === 'serviceImage') {
            folder += 'services';
        } else {
            folder += 'others';
        }
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Only .jpeg or .png files are allowed'));
        }
    }
});

export default upload;