import { Module } from "@nestjs/common";
import { UserService } from "./services/user.service";
import { UserController } from "./controllers/user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { PasswordService } from "../auth/password.service";
import { CloudinaryService } from "src/integration/cloudinary/cloudinary.service";


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, PasswordService, CloudinaryService],
    exports: [UserService]
})

export class UserModule{}

