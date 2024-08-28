"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        let folder = 'public/';
        if (file.fieldname === 'projectImage') {
            folder += 'projects';
        }
        else if (file.fieldname === 'serviceImage') {
            folder += 'services';
        }
        else {
            folder += 'others';
        }
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path_1.default.extname(file.originalname)}`);
    }
});
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        }
        else {
            cb(new Error('Only .jpeg or .png files are allowed'));
        }
    }
});
exports.default = upload;
