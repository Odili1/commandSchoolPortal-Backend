import { TypeOrmModuleOptions } from "@nestjs/typeorm"
// import { envConfig } from "src/config"

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