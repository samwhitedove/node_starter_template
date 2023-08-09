import { IResponseData } from './../dto/dto.response';
import { Response } from "express";
import { ILogError } from "../../core/error/config.logger";


 export default class IResponse {

    constructor(private readonly responseDto: IResponseData){
        this.responseDto = responseDto;
    }

    SuccessResponse(res: Response, data?: object | undefined, message?: string | undefined, statusCode?: number) {
        const { error, value } = this.responseDto.SuccessResponseDto.validate({ message: message, statusCode, data: data });
        if (error) {
            throw error.details[0].message
        }

        value.message = value.message.toString();
        return res.status(value.statusCode).send(value);
    }

    ErrorFailedResponse(res: Response, message?: string | undefined, statusCode?: number) {
        const { error, value } =  this.responseDto. ErrorFailedRespnse.validate({ message: message, statusCode });
        if (error) {
            throw error.details[0].message
        }

        return res.status(value.statusCode).send(value);
    }

    ServerErrorResponse(res: Response, message?: string | undefined) {
        const { error, value } = this.responseDto. ServerErrorResponseDto.validate({ message: message });
        if (error) {
            console.log(error);
            ILogError(error.details[0].message);
            throw error.details[0].message
        }
        return res.status(value.statusCode).send(value);
    }

}

export const iresponse = new IResponse(new  IResponseData())