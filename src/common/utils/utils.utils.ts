import { config } from "dotenv";
import { Response } from "express";
import { randomUUID } from "crypto";
import IResponse from "../responses/reponses.response";


export default class IUtils {
    // private readonly response: IResponse;

    constructor (private readonly response: IResponse){
        this.response = response;
    }

    afterTimeInMilliseconds = (minute: number, now?: boolean): number => {
        const time = new Date();
        console.log(time.getTime());
        if (now) return time.getTime();
        const fifteenMinutesLater = new Date(time);
        const laterTime = fifteenMinutesLater.setMinutes(fifteenMinutesLater.getMinutes() + minute);
        console.log(laterTime)
        return laterTime;

    }

     env = config()

     wrapper = async (res: Response<any, Record<string, any>>, funct: Function, message?: string, parameter?: object) => {
        try {
            return await funct.apply(this, parameter)
        } catch (error: any) {
            console.log('Other Error :::::', error);
            return this.response.ErrorFailedResponse(res, message ?? error);
        }
    }

    static generateCode() {
        const min = 100000; // Minimum value (inclusive)
        const max = 999999; // Maximum value (inclusive)
        return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
    }

    static generateUUID(lenght?: number): string {
        const uuid = randomUUID().replace(/-/g, '');
        const maxLenght = uuid.length;
        const result = uuid.substring(0, lenght ?? maxLenght);
        return result;
    }

}