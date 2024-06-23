import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeOrmConstants, typeOrmConstantsAsync } from './config/typeorm.config';
// import { AdminModule } from './modules/user/admin/admin.module';
import { dataSourceOptions } from './database/data-source';
// import { CreateAdminCommand } from './create-admin.command';
import { UsersParentModule } from './modules/user/usersParentModule.module';
// import { UserModule } from './modules/user/user.module';
import { AdminModule } from './modules/user/admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './config/jwt.config';
// import { CommandRunnerModule } from 'nest-commander';

@Module({
  imports: [
    AdminModule, 
    // UserModule,
    UsersParentModule, 
    // CommandRunnerModule, 
    TypeOrmModule.forRoot(dataSourceOptions),
    JwtModule.register(jwtConfig)
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // CreateAdminCommand
  ],
})
export class AppModule {}
