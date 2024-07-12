import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { roleFromIdPrefix } from "../helpers/idPrefix.helper";



@Injectable()
export class RoleGuard implements CanActivate{
    constructor(
        private reflector: Reflector
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        console.log('Role Guard');
        
        // IF THERE IS NOT USER DETAILS FROM THE REQUEST OBJECT THEN THE ROUTE IS PROBABLY PUBLIC (PUBLIC DECORATOR IN USE)
        const {user} = context.switchToHttp().getRequest();

        if (!user){
            return true
        }
               
        const role = this.reflector.getAllAndOverride<string[]>('role', [context.getHandler(), context.getClass()])
        
        console.log(`User: ${JSON.stringify(user)}, Role: ${role}`);

        console.log(`RoleGuard => Roles: ${role}`)


        const userRole = roleFromIdPrefix(user.userId)
        console.log(`Authorized Role: ${role.includes(userRole)}`);
        
        return role.includes(userRole)
    }
}



