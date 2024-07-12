import { envConfig } from "src/config/envConfig"

export const jwtConfig = {
    global: true,
    secret: envConfig.JWT_SECRET,
    signOptions: {expiresIn: '1h'}
}