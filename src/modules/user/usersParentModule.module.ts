import { Module } from "@nestjs/common";
import { UserModule } from "./user.module";
import { AdminModule } from "./admin/admin.module";
import { UserService } from "./user.service";
import { AdminService } from "./admin/admin.service";
import { PasswordService } from "./auth/password.service";


@Module({
    imports: [AdminModule, UserModule],
    controllers: [],
    providers: [UserService, AdminService, PasswordService],
    exports: [AdminService, UserService]
})

export class UsersParentModule{}

