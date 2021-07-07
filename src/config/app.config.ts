import { registerAs } from '@nestjs/config';

export interface IAppConfigType {
    DATABASE: string
}


export class AppConfig{
    public static readonly DatabaseConfig = "database";
    public static readonly InitialUserConfig = "initialUser";
    public static readonly StorageConfig = 'storage'
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

export interface InitialUserConfig {
    email: string;
    pass: string;
}


export interface IStorageConfig {
    endpoint: string;
    accessKeyId: string;
    secretAccessKey: string;
}

export var DatabaseConfig = registerAs(AppConfig.DatabaseConfig, () => ({
     
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_NAME,
        isSrv: process.env.DB_IS_SRV == "true" ? true:false,
        user: process.env.DB_USR,
        password: process.env.DB_PASS
    
}));

export var InitialUserConfig = registerAs(AppConfig.InitialUserConfig, () => ({
     
    email: process.env.INIT_USER_EMAIL,
    pass: process.env.INIT_USER_PASS

}));

export var StorageConfig = registerAs(AppConfig.StorageConfig, () => ({
     
            endpoint: process.env.ENDPOINT, //fra1.digitaloceanspaces.com,
            accessKeyId: process.env.ACCESS_KEY_ID,   //'RZUJ5L4LMUU2GODM4NGD',
            secretAccessKey: process.env.SECRET_ACCESS_KEY //'zBJwREw/NJnrfI5lhJOIfEnfySnsYwwFdyc9LQcffxk'

}));