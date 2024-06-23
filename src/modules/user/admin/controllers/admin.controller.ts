import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateAdminDto } from '../../dtos/admin.dto';
import { AdminService } from '../services/admin.service';
import { IAdmin } from '../../interfaces/admin.interface';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Role } from 'src/common/decorators/role.decorator';

@UseGuards(RoleGuard)
@Role('student', 'admin')
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('/create')
  async createAdmin(@Body() createAdminDto: CreateAdminDto): Promise<IAdmin> {
    try {
      console.log(createAdminDto);
      const createdAdmin = this.adminService.createAdmin(createAdminDto);

      return createdAdmin;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException('Invalid input data');
      }

      throw new Error(error);
    }
  }
}
