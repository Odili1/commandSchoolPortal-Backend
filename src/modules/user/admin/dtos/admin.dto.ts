import { IsString } from "class-validator";



export class AdminSignupDto{

}


export class AdminDto{
    @IsString()
    readonly username: string

    @IsString()
    readonly password: string
}



