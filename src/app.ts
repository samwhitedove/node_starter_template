import path from 'path';
import express, { Request, Response } from "express";
import morgan from 'morgan';
import IRoute from './core/routes/routes.maker';
import IDatabase, { DbTypes } from './core/config/db.config';
import cors from 'cors';
import { config } from 'dotenv';
import { handleError } from './common/middleware/middleware.error.handler';
import AuthController from './modules/auth/auth.controller';

config()

class StartApp {

    private readonly app = express();

    public constructor(private readonly database: IDatabase, port: number, private readonly controllers: any[], 
       ) {
        //start app 
        this.start(port)
        console.log(this.controllers.length, "------- contoller");
    }

    async start(port: number) {
        // create a connection too the database and specifiying which db to use
        const db = await this.database.iniializeDB(DbTypes.MySQL);
        //dev log on the console
        this.app.use(morgan("dev"));
        //cors implemented
        this.app.use(cors());
        //handle json body request
        this.app.use(express.json());
        //handle form data request
        this.app.use(express.urlencoded({ extended: true }));
        //serving static file from specifies folder
        this.app.use('/uploads/userIdentificationImage', express.static(path.join(__dirname, 'uploads/userIdentificationImage')));
        this.app.use('/uploads/profileImages', express.static(path.join(__dirname, 'uploads/profileImages')));
        this.app.use('/uploads/collateral', express.static(path.join(__dirname, 'uploads/collateral')));

        //check if database is connected before starting the server
        if (db.status) {
            console.log(db.message);
            //redirect user to the main website
            this.app.get("/", (_req:Request, res:Response)=>{res.redirect(`https://${process.env.SITE_URL}`)});
            this.app.get("/api/v1", (_req:Request, res:Response)=>{res.send('<h1 style="text-align:center;margin-top:20%">Yaweh !!!</h1>')});
            if (IRoute.instance?.routes()) this.app.use("/api/v1", IRoute.instance.routes())
            this.app.use(handleError.handleError)
            this.app.use(handleError.notFound404)

            const server = this.app.listen(port, () => {
                console.log('Server is running on port ' + port);
            });

            console.log(`Server running at ${process.env.SITE_URL}:${port}/`);
            return server;
        }
        throw db.message;
    }
}


new StartApp(new IDatabase(), parseInt(process.env.SERVER_PORT!), [AuthController]);













