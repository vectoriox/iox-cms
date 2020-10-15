import { registerAs } from '@nestjs/config';

export interface IAppConfigType {
    DATABASE: string
}


export class AppConfig{
    public static readonly DatabaseConfig = "database";
}





export interface DatabaseConfig {
    type: string;
    host: string;
    port: number;
    name: string;
    isSrv: string;
    user: string;
    password: string;
}

export var DatabaseConfig = registerAs(AppConfig.DatabaseConfig, () => ({
     
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_NAME,
        isSrv: process.env.DB_IS_SRV,
        user: process.env.DB_USR,
        password: process.env.DB_PASS
    
}));