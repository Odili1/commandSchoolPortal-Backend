import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { envConfig } from "src/config/envConfig";
import { IS_PUBLIC_KEY } from "../decorators/auth.decorator";



@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Check if it's a public route
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getHandler()])

        console.log(`AuthGuard => isPlublic: ${isPublic}`);
        
        if (isPublic){
            return true
        }



        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromCookie(request)

        if (!token) {
            throw new UnauthorizedException('Login to continue')
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {secret: envConfig.JWT_SECRET})

            console.log(payload);
            

            // if (!payload) {
            //     throw new UnauthorizedException('Invalid token. Login to continue')
            // }

            request['user'] = payload
        } catch (error) {
            throw new UnauthorizedException(error)
        }

        return true
    }

    private extractTokenFromCookie(request: Request): string | undefined{
        // const [type, token] = request.headers.authorization?.split(' ') ?? []
        const token = request.cookies['access_token'];

        return token ? token : undefined
    }
}









