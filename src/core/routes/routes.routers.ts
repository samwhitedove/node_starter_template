
import IRoute from "./routes.maker";
    
export function GetRequest(route:IRoute, path: string){

    return function(target: Object, key: string | symbol, descriptor: PropertyDescriptor){
        const original = descriptor.value;
        
        //preparing the function for every route created
        descriptor.value = function(...args: any[]){
            original.apply(this, args)
        };

        //creating the route
        route.createRoute(path, original, route.methods.get)
        return descriptor
    };
}
export function PostRequest(route:IRoute, path: string){

    return function(target: Object, key: string | symbol, descriptor: PropertyDescriptor){
        const original = descriptor.value;
        
        //preparing the function for every route created
        descriptor.value = function(...args: any[]){
            original.apply(this, args)
        };

        //creating the route
        route.createRoute(path, original, route.methods.post)
        return descriptor
    };
}
export function PatchRequest(route:IRoute, path: string){

    return function(target: Object, key: string | symbol, descriptor: PropertyDescriptor){
        const original = descriptor.value;
        
        //preparing the function for every route created
        descriptor.value = function(...args: any[]){
            original.apply(this, args)
        };

        //creating the route
        route.createRoute(path, original, route.methods.patch)
        return descriptor
    };
}
export function PutRequest(route:IRoute, path: string){

    return function(target: Object, key: string | symbol, descriptor: PropertyDescriptor){
        const original = descriptor.value;
        
        //preparing the function for every route created
        descriptor.value = function(...args: any[]){
            original.apply(this, args)
        };

        //creating the route
        route.createRoute(path, original, route.methods.put)
        return descriptor
    };
}
export function DeleteRequest(route:IRoute, path: string){

    return function(target: Object, key: string | symbol, descriptor: PropertyDescriptor){
        const original = descriptor.value;
        
        //preparing the function for every route created
        descriptor.value = function(...args: any[]){
            original.apply(this, args)
        };

        //creating the route
        route.createRoute(path, original, route.methods.delete)
        return descriptor
    };
}
