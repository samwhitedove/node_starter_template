
import { NextFunction, Request, Response } from "express";
import { BaseError } from "../../core/error/base.error";
import IResponse, { iresponse } from "../responses/reponses.response";


export default class IHandleErrorAnd404 {

    constructor(private readonly iResponse: IResponse){
        this.iResponse = iResponse;
    }
    
    handleError = (error: Error, req: Request, res: Response, next: NextFunction) => {

        if(error instanceof BaseError){
            return this.iResponse.ErrorFailedResponse(res, error.message, error.statusCode)
        }

        return this.iResponse.ServerErrorResponse(res, error.message)
    }

    notFound404 = (req: Request, res: Response) => {
        return res.status(404).send({message: '🚨 Route does not exist 🛠'});
    }
}

export const handleError = new IHandleErrorAnd404(iresponse);