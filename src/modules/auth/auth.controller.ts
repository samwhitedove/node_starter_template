
import { NextFunction, Request, Response } from "express";
import { GetRequest, PostRequest, PutRequest } from "../../core/routes/routes.routers";
import "reflect-metadata";
import IRoute from "../../core/routes/routes.maker";
import { UsePipe } from "../../core/decorators/decorator.genneral";
import { imiddleware } from "../../common/middleware/middleware.helper";
import { loginDto } from "./dto/dto.login";


class AuthController {

    private static readonly middleware: typeof imiddleware = imiddleware
    private static readonly route:  IRoute = new IRoute('auth');

    static test(req:Request, res: Response, next: NextFunction){
        console.log("some testing")
        
    }

    // setting as put route
    @PutRequest(AuthController.route, "/register")
    //adding middlewares
    @UsePipe(AuthController.test)
    @UsePipe(AuthController.middleware.validateRequestBody(loginDto))
    @UsePipe(AuthController.middleware.validateToken)
    register(req:Request, res: Response, _next: NextFunction){
        console.log(req.body, "main functions")
        res.send(req.body)
    }
    
    @PostRequest(AuthController.route, "/login")
    login(req:Request, res: Response, _next: NextFunction){
       
    }
    
    @GetRequest(AuthController.route, "/verify-otp")
    verify(req:Request, res: Response, _next: NextFunction){
       
    }
    
}

export default  AuthController;