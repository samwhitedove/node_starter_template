
import { config } from "dotenv";
import { DataSource, DatabaseType } from "typeorm";

config()

export enum DbTypes {
    MySQL = "mysql", Postgres = 'posgress'
}

class IDatabase {

    private static instance: IDatabase;
    private dbInstance: DataSource | undefined;
    public dataSourceConnection: DataSource | undefined;

    constructor(){
        if (!IDatabase.instance) {
            IDatabase.instance = this;
        }
        return IDatabase.instance
    }

    async iniializeDB(db: DbTypes) {
        let data;
        if (!this.dbInstance) {
            data = await this.connect(db)
            if(data.status) this.dataSourceConnection = data.connection
            return data;
        }

        return  { status: true, message: "database already connected successful", connection: this.dbInstance };
    }

    private readonly mysql_db = () =>  new DataSource({
        type: "mysql",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT as unknown as  number,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        synchronize: process.env.SYNC ? true : false,
        logging: false,
        entities: ["**/*.entities.ts"],
        migrations: ["**/migrations/*.ts"],
        subscribers: ["**/subscribers/*.ts"],
    })
    
    private readonly pg_db = () =>  new DataSource({
        type: "postgres",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT as unknown as  number,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        synchronize: process.env.SYNC ? true : false,
        logging: false,
        entities: ["**/*.entities.ts"],
        migrations: ["**/migrations/*.ts"],
        subscribers: ["**/subscribers/*.ts"],
    })

    private async connect(connectionType: DbTypes) {
        try {
            if (this.dbInstance) return { status: true, message: "database already connected successful", connection: this.dbInstance };
            if(connectionType === DbTypes.MySQL) this.dbInstance = await this.mysql_db().initialize();
            if(connectionType === DbTypes.Postgres) this.dbInstance = await this.pg_db().initialize();

            return { status: true, message: "database connect successful", connection: this.dbInstance };
        } catch (error) {
            console.log(error);
            return { status: false, message: error };
        }
    }
}

export default IDatabase;