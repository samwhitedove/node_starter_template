import { NextFunction, Request, Response } from "express";

export function UsePipe(modifierFn: Function) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

        descriptor.value = async function(...args: any){
            let free = false;
            try {
                await modifierFn.apply(this, args); 
                free = true;
            } catch (error: any) {
                args[2](error)
            }

            if(free) await original.apply(this, args);
            
        }

        return descriptor;
    };
}
