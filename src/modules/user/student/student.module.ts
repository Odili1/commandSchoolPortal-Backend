import { Module } from "@nestjs/common";
import { StudentController } from "./controllers/student.controller";
import { StudentService } from "./services/student.service";
import { UserModule } from "../combinedUsers/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "./entities/student.entity";




@Module({
    imports: [UserModule, TypeOrmModule.forFeature([Student])],
    controllers: [StudentController],
    providers: [StudentService],
    exports: [StudentService]
})
export class StudentModule {}