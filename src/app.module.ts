import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConstants } from './config/typeorm.config';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [AdminModule, TypeOrmModule.forRoot(typeOrmConstants)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
