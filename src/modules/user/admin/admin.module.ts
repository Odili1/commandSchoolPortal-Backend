import { Module } from '@nestjs/common';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { PasswordService } from '../auth/password.service';
import { UserModule } from '../combinedUsers/user.module';
// import { UserModule } from '../user.module';
// import { UserService } from '../user.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Admin])],
  controllers: [AdminController],
  providers: [AdminService, PasswordService],
  exports: [AdminService],
})
export class AdminModule {}
