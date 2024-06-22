import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm"
// import { envConfig } from "src/config"


export default class TypeOrmConfig{
    static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions{
        return {
            type: 'postgres',
            host: configService.get<string>('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            username: configService.get<string>('DB_USER'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_NAME'),
            entities: [__dirname + '/../**/*.entity.{js,ts}'],
            synchronize: true,
            logging: true
        }
    }
}


export  const typeOrmConstantsAsync: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async(configService: ConfigService): Promise<TypeOrmModuleOptions> => {
        return TypeOrmConfig.getOrmConfig(configService)
    },
    inject: [ConfigService]
}

export const typeOrmConstants: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    port: 6543,
    username: 'postgres.vppxhwkytrqgrqecakup',
    password: 'Odili0805$$',
    database: 'postgres',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
    logging: true
}



