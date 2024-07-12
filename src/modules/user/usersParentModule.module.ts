import { Module } from "@nestjs/common";
// import { UserModule } from "./user.module";
import { AdminModule } from "./admin/admin.module";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { PasswordService } from "./auth/password.service";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "src/common/guards/auth.guard";
import { UserModule } from "./combinedUsers/user.module";
import { StudentModule } from "./student/student.module";
import { CloudinaryService } from "src/integration/cloudinary/cloudinary.service";



@Module({
    imports: [AdminModule, UserModule, StudentModule],
    controllers: [AuthController],
    providers: [AuthService, PasswordService, CloudinaryService, {
        provide: APP_GUARD,
        useClass: AuthGuard
    }],
    exports: [AdminModule, UserModule, StudentModule]
})

export class UsersParentModule{}

