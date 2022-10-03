import { Request, Response } from 'express';
import sharp from 'sharp';
import { unlink } from 'fs/promises';

export const ping = (req: Request, res: Response) => {
    res.json({body: req.body});
}

export const uploadFile = async (req: Request, res: Response) => {
    if(req.file) {

        const filename = `${req.file.filename}.jpg`;

        await sharp(req.file.path)
            .resize(400,null, {
                fit: 'cover'
            })
            .toFormat('jpeg')
            .toFile(`./public/media/${filename}.jpg`);
        await unlink(req.file.path);
        
        res.json({image: `${filename}.jpg`});
        return;
    } 

    res.status(400);
    res.json({ error: 'Arquivo inválido.' })
    
}
