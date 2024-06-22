import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeOrmConstants, typeOrmConstantsAsync } from './config/typeorm.config';
// import { AdminModule } from './modules/user/admin/admin.module';
import { dataSourceOptions } from './database/data-source';
import { CreateAdminCommand } from './create-admin.command';
// import { UsersParentModule } from './modules/user/usersParentModule.module';
import { UserModule } from './modules/user/user.module';
import { AdminModule } from './modules/user/admin/admin.module';
import { CommandRunnerModule } from 'nest-commander';

@Module({
  imports: [AdminModule, UserModule, CommandRunnerModule, TypeOrmModule.forRoot(dataSourceOptions)],
  controllers: [AppController],
  providers: [AppService, CreateAdminCommand],
})
export class AppModule {}
