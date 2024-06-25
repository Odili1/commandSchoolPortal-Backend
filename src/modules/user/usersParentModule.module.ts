import { Module } from "@nestjs/common";
// import { UserModule } from "./user.module";
import { AdminModule } from "./admin/admin.module";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { PasswordService } from "./auth/password.service";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "src/common/guards/auth.guard";
import { UserModule } from "./combinedUsers/user.module";



@Module({
    imports: [AdminModule, UserModule],
    controllers: [AuthController],
    providers: [AuthService, PasswordService, {
        provide: APP_GUARD,
        useClass: AuthGuard
    }],
    exports: [AdminModule, UserModule]
})

export class UsersParentModule{}

