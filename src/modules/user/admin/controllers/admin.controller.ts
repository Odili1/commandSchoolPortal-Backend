import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateAdminDto, CreateAdminDto } from '../../dtos/admin.dto';
import { AdminService } from '../services/admin.service';
import { IAdmin } from '../../interfaces/users.interface';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Role } from 'src/common/decorators/role.decorator';
import { Public } from 'src/common/decorators/auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { idPrefixFunc, validIdPrefix } from 'src/common/helpers/idPrefix.helper';

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

  @Get('all')
  async getStudents(): Promise<IAdmin[]>{
    try {
      console.log(`Admin Controller: All`)
      const students = await this.adminService.getAllAdmins()

      return students
    } catch (error) {
      if (error instanceof NotFoundException){
          throw new NotFoundException(error)
      }

      throw new Error(error)
    }
  }
  
  @Get(':id')
  async getStudent(@Param('id') adminId:string): Promise<IAdmin>{
    try {
      console.log(`AdminController id: ${adminId}`)
      // Check Id Input
      const idPrefix = idPrefixFunc(adminId)
      if (!validIdPrefix(idPrefix)){
        throw new BadRequestException('Invalid Id Prefix')
      }

      const admin = await this.adminService.getAdminById(adminId)

      return admin
    } catch (error) {
      if (error instanceof BadRequestException){
        throw new BadRequestException(error)
      }

      throw new Error(error)
    }
  }


  @Put('/update/:userId')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateAdmin(@Param('userId') userId: string, @Body() adminProfileDto: UpdateAdminDto, @UploadedFile() file?: Express.Multer.File,): Promise<IAdmin>{
    try {
      console.log(`Admin Controller => file received: ${JSON.stringify(file)}`);
      
      return this.adminService.updateAdmin(userId, adminProfileDto, file)
    } catch (error) {
      throw new Error(error)
    }
  }
}
