import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import multiparty from 'multiparty';
import mime from 'mime-types';
import stream from 'stream';
import util from 'util';
import fs from 'fs';

const pipeline = util.promisify(stream.pipeline);

export default async function handle(req, res) {
    const bucketName = "next-ecommerce-bao";
    const form = new multiparty.Form();
    
    const {fields, files} = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({fields, files});
        });
    });

    const client = new S3Client({
        region: "ca-central-1",
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
        }
    });

    const links = [];
    for (const file of files.file) {
        const ext = file.originalFilename.split('.').pop();
        const newFileName = Date.now() + '.' + ext;

        // Create a readable stream from the uploaded file
        const fileStream = fs.createReadStream(file.path);

        // Upload the stream directly to S3
        await client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: newFileName,
            Body: fileStream,
            ACL: "public-read",
            ContentType: mime.lookup(file.path)
        }));

        const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;
        links.push(link);
    }

    return res.json({links});
}

export const config = {
    api: {
        bodyParser: false
    }
};
