import Joi from 'joi';

export class IResponseData {

    public UN_AUTHORIZED: number = 401;
    public SUCCESS: number = 200;
    public CREATED: number = 201;
    public REDIRECT: number = 301;
    public BAD_REQUEST: number = 400;
    public NOT_FOUND: number = 404;
    public INTERNAL_SERVER_ERROR: number = 500;
    public FORBIDDEN: number = 403;
    public CONFLICT: number = 409;
    public NO_CONTENT: number = 204;

    SuccessResponseDto = Joi.object({
        statusCode: Joi.number().default(this.SUCCESS),
        message: Joi.string().default("Successful"),
        success: Joi.boolean().default(true),
        data: Joi.any().default(null)
    });
    
    ErrorFailedRespnse =  Joi.object({
        statusCode: Joi.number().default(this.BAD_REQUEST),
        message: Joi.string().default("Unable to complete, An error occurred!."),
        success: Joi.boolean().default(false),
        data: Joi.any().default(null)
    });

    ServerErrorResponseDto = Joi.object({
        statusCode: Joi.number().default(this.INTERNAL_SERVER_ERROR),
        message: Joi.string().default("Internal Server Error"),
        success: Joi.boolean().default(false),
        data: Joi.any().default(null)
    });
}