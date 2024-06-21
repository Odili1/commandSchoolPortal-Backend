import * as dotenv from 'dotenv'
dotenv.config()


function getEnv(envKey: string): any{
    return process.env[envKey] ?? undefined
}

function getEnvString(envKey: string): string{
    const val = getEnv(envKey)
    return val || ''
}

function getEnvNumber(envKey: string, defaultValue?: number){
    const val = getEnv(envKey)
    return val !== undefined && !isNaN(Number(val)) ? Number(val) : defaultValue
}

export const envConfig = {
    DB_NAME: getEnvString('DB_NAME'),
    DB_HOST: getEnvString('DB_HOST'),
    DB_USERNAME: getEnvString('DB_USERNAME'),
    DB_TYPE: getEnvString('DB_TYPE'),
    DB_PASSWORD: getEnvString('DB_PASSWORD'),
    DB_PORT: getEnvNumber('DB_PORT', 3306)
}


