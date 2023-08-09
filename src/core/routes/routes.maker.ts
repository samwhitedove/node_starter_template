import { RequestHandler, Router } from "express";

export enum requestMethods {
    post, get, patch, put, delete
}

class IRoute {
    
    methods: {post: string, get: string , patch: string , put: string, delete: string} = {post: "post", get: "get" , patch: "patch" , put: "put" , delete: "delete"}
    route: Router = Router() 
    private name: string | undefined;  
    static instance: IRoute;

    constructor(name: string) {
        if (!IRoute.instance) {
            IRoute.instance = this;
        }
        console.log(name)
        IRoute.instance.name = name;
        return IRoute.instance;
    }

    createRoute(path: string, routeFunction: any, method: string) {
        switch (method) {
            case this.methods.delete:
                console.log(`DELETE METHOD ---> ${this.name}${path} ROUTE CREATED :::`);
                return this.route.delete(`/${this.name}${path}`, routeFunction);
            case this.methods.post:
                console.log(`POST METHOD ---> ${this.name}${path} ROUTE CREATED :::`);
                return this.route.post(`/${this.name}${path}`,  routeFunction);
            case this.methods.get:
                console.log(`GET METHOD ---> ${this.name}${path} ROUTE CREATED :::`);
                return this.route.get(`/${this.name}${path}`, routeFunction);
            case this.methods.put:
                console.log(`PUT METHOD ---> ${this.name}${path} ROUTE CREATED :::`);
                return this.route.put(`/${this.name}${path}`,  routeFunction);
            case this.methods.patch:
                console.log(`PATCH METHOD ---> ${this.name}${path} ROUTE CREATED :::`);
                return this.route.patch(`/${this.name}${path}`,  routeFunction);
            default:
                console.log("Http Request Method not found Method not found");
        }
    }

    routes() {
        return this.route;
    }

}

export default IRoute;
