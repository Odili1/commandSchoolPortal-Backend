import {
  BadRequestException,
  Body,
  Controller,
  // Param,
  Post,
  // Put,
  // UploadedFile,
  UseGuards,
  // UseInterceptors,
} from '@nestjs/common';
import { CreateAdminDto } from '../../dtos/admin.dto';
import { AdminService } from '../services/admin.service';
import { IAdmin } from '../../interfaces/users.interface';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Role } from 'src/common/decorators/role.decorator';
import { Public } from 'src/common/decorators/auth.decorator';
// import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(RoleGuard)
@Role('admin')
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Public(true)
  @Post('/create')
  async createAdmin(@Body() createAdminDto: CreateAdminDto): Promise<IAdmin> {
    try {
      //   console.log(createAdminDto);
      const createdAdmin = this.adminService.createAdmin(createAdminDto);

      return createdAdmin;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error);
      }

      throw new Error(error);
    }
  }

  // @Put('/:id/update')
  // @UseInterceptors(FileInterceptor('avatar'))
  // async updateAdmin(@UploadedFile() file: Express.Multer.File, @Param('id') id: string, @Body() adminProfileDto: AdminProfileDto): Promise<IAdmin>{
  //   return this.adminService.updateAdmin(id, file, adminProfileDto)
  // }
}
