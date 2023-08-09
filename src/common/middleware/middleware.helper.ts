
import { NextFunction, Response, Request } from "express";
import Joi from 'joi';
import multer, { memoryStorage } from "multer";
import { IResponseData } from "../dto";
import { IToken } from "../utils/utils.jwt";
import { IEntity } from "../../core/repository/base.repository";
import { DestoyedTokenEntity } from "../../entities/auth.entities";
import IResponse, { iresponse } from "../responses/reponses.response";
import { BadRequestException, UnAuthorizedException } from "../../core";


class IMiddleware {

    constructor(private readonly response: IResponse,
        private readonly  token: IToken,
        private readonly  destroyedToken: IEntity<DestoyedTokenEntity>){
            this.response = response;
            this.token = token;
            this.destroyedToken = destroyedToken;
    }

   

    validateRequestBody(dto: Joi.ObjectSchema) {
        return (req: Request, res: Response, next: NextFunction) => {
            
                // Access the parameter and perform some logic
                const { error, value } = dto.validate(req.body);
                if (error) {
                    // Return a response indicating the validation error
                    throw new BadRequestException(error.details[0].message)
                    // return this.response.ServerErrorResponse(res, error.details[0].message)
                }
                // Call next() to pass control to the next middleware or route handler
                req.body = value;
                // next();

        };
    }

    public validateToken = async (req: Request, res: Response, next: NextFunction) => {

            const header = req.headers.authorization;
            // if (!header) return this.response.ErrorFailedResponse(res, 'Unauthorized, acccess token is required', this.responseData.UN_AUTHORIZED)
            if (!header) throw new UnAuthorizedException('Unauthorized, acccess token is required')
            // if (!header.startsWith('Bearer')) return this.response.ErrorFailedResponse(res, 'token must be formated "Bearer {token}"', this.responseData.UN_AUTHORIZED)
            if (!header.startsWith('Bearer')) throw new UnAuthorizedException('token must be formated "Bearer [token]"')
            const token = header!.split(' ')[1]
            const valid = await this.destroyedToken.findOne({ token })
            // console.log(valid);
            // if (valid) return this.response.ErrorFailedResponse(res, 'Unauthorized, invalid access token', this.responseData.UN_AUTHORIZED)
            if (valid) throw new UnAuthorizedException('Unauthorized, invalid access token')
            const verify = this.token.verifyJWTToken(token);
            if (verify.status) {
                req.body.user = verify.data;
                // return next();
                return;
            }
            throw new UnAuthorizedException('Unauthorized access')

      
    }

    //  checkPreviledge = async (req: Request, res: Response, next: NextFunction) => {
    //     const valid = await DB.findOneById(AppCollectionRef.User, [req.body.user.id])
    //     if (valid.status) {
    //         if (!valid.data.isAdmin) return this.response.ErrorFailedResponse(res, 'Unauthorized access', this.responseDto.UnAuthorized)
    //         return next();
    //     }
    // }

     validateMultipleImageBody(dto: Joi.ObjectSchema, lenght: number = 0) {

        return (req: any, res: Response, next: NextFunction) => {
            const files: Express.Multer.File[] = req.files;
            // Access the parameter and perform some logic
            try {
                const schemaDescription = dto.describe();
                const keysArray: string[] = Object.keys(schemaDescription.keys);
                const reciedFileKey: string[] = files.map((item) => item.fieldname);
                console.log(keysArray);
                keysArray.forEach((item: string) => {
                    if (!reciedFileKey.includes(item)) {
                        throw new BadRequestException(`${item} is required.`);
                    }
                });
            } catch (error: any) {
                console.log(error)
                throw new BadRequestException(error)
            }
            console.log('moving to next middleware')
            // next();
        }
    };

    // Set up file type validation
    private  multerFileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
        // Allow only specific file types
        console.log(file.mimetype + "------------------ mimetype")
        console.log(file.fieldname + "------------------ fieldname")
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf' || file.mimetype === 'image/jpg') {
            if (file.size > 5 * 1024 * 1024) {
                cb(new BadRequestException(`File size limit exceeded for ${file.fieldname}. Maximum file size is 5MB.`), false);
            } else {
                cb(null, true); // Accept the file
            }
        } else {
            cb(new BadRequestException('multer Invalid file type. Only JPEG, JPG, PNG and PDF are allowed.'), false); // Reject the file
        }
    };

    // Set up Multer for file uploading
     multerConfig = multer({
        storage: memoryStorage(),
        fileFilter: this.multerFileFilter, // Apply the file type validation
        limits: {
            fileSize: 5 * 1024 * 1024, // Maximum file size in bytes (5MB here)
        },
    })
}


export const imiddleware = new IMiddleware(iresponse, new IToken(), new IEntity<DestoyedTokenEntity>(DestoyedTokenEntity))
