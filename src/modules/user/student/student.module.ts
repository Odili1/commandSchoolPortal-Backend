import { Module } from "@nestjs/common";
import { StudentController } from "./controllers/student.controller";
import { StudentService } from "./services/student.service";
import { UserModule } from "../combinedUsers/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "./entities/student.entity";
import { PasswordService } from "../auth/password.service";




@Module({
    imports: [UserModule, TypeOrmModule.forFeature([Student])],
    controllers: [StudentController],
    providers: [StudentService, PasswordService],
    exports: [StudentService]
})
export class StudentModule {}