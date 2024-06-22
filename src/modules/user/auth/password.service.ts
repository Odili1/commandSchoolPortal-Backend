import { Injectable } from "@nestjs/common";
import * as argon from 'argon2'




@Injectable()
export class PasswordService{
    constructor(){}

    async hashPassword(password: string): Promise<string>{
        const hashedPassword = await argon.hash(password)
        return hashedPassword
    }

    async validPassword(inputPassword: string, hashedpassword: string): Promise<boolean>{
        return await argon.verify(hashedpassword, inputPassword)
    }
}




