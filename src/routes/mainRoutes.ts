import { Router } from "express";
import * as UploadController from '../controller/UploadController';
import multer from "multer";
import path from 'path';
import { uuid } from 'uuidv4';

const upload = multer({
    dest: './tmp',
    fileFilter: (req, file, cb) => {
        const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png'];
        cb(null, allowed.includes(file.mimetype));
    },
    limits: { fieldSize: 2000000 }
});

const router = Router();

router.get('/ping', UploadController.ping);
router.post('/upload', upload.single('avatar'), UploadController.uploadFile);

export default router;