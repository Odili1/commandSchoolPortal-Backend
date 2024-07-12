import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { UploadApiErrorResponse, UploadApiResponse, v2 } from "cloudinary";
import { cloudinaryConfig } from "src/config/cloudinaryConfig";
import { Readable } from "stream";





@Injectable()
export class CloudinaryService {
    async uploadFile (file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse>{
        try {
            // Configure Cloudinary
            v2.config(cloudinaryConfig)
    
            // Debugging the file properties
            console.log('File properties:', {
                originalname: file.originalname,
                mimetype: file.mimetype,
                size: file.size,
                bufferType: typeof file.buffer,
            });
    
            // Check file size of file
            if (typeof file.size !== 'number' || isNaN(file.size)) {
                throw new BadRequestException('Invalid file size');
            }
    
            return new Promise((resolve, reject) => {
                const upload = v2.uploader.upload_stream({resource_type: 'auto'}, (error, result) => {
                    console.log(`Cloudinary Error: ${error}`);
                    if (error) reject(error)
                    
                    // Successfull Upload
                    resolve(result)
                })
    
                const readableStream = new Readable()
                readableStream.push(file.buffer)
                readableStream.push(null)
                readableStream.pipe(upload)
            })
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}