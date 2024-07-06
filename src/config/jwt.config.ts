import { envConfig } from "src/config/envConfig"

export const jwtConfig = {
    global: true,
    secret: envConfig.DB_JWTSECRET,
    signOptions: {expiresIn: '30s'}
}