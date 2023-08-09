import { IResponseData } from "../../common";


export class BaseError extends Error {

  statusCode: number;

  success: boolean;

  data: null;

  constructor(name: string, statusCode: number, message: string, data = null, success = false){
    super(message);

    Object.setPrototypeOf(this, BaseError.prototype);
  
    this.name = name;
    this.success = success
    this.statusCode = statusCode;
    this.data = data;

    Error.captureStackTrace(this);
  }
}

const ResponseMethod = new IResponseData();

export class NotFoundException extends BaseError {
  constructor(message: string){
    super('NOT_FOUND_EXCEPTION', ResponseMethod.NOT_FOUND, message);
  }
}

export class BadRequestException extends BaseError {
  constructor(message: string){
    super('BAD_REQUEST_EXCEPTION', ResponseMethod.BAD_REQUEST, message );
  }
}

export class UnAuthorizedException extends BaseError {
  constructor(message: string){
    super('UN_AUTHORIZED_EXCEPTION', ResponseMethod.UN_AUTHORIZED, message);
  }
}

export class ForbiddenExceptionextends extends BaseError {
  constructor(message: string){
    super('FORBIDDEN_EXCEPTION', ResponseMethod.FORBIDDEN, message);
  }
}
