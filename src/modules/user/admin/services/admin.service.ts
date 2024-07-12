import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../entities/admin.entity';
import { Repository } from 'typeorm';
import { CreateAdminDto } from '../../dtos/admin.dto';
import { PasswordService } from '../../auth/password.service';
import { IAdmin } from '../../interfaces/users.interface';
import { UserService } from '../../combinedUsers/services/user.service';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private passwordService: PasswordService,
    private userService: UserService,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto): Promise<IAdmin> {
    try {
      console.log(`Admin Service`);
      // New User Details
      const { firstName, lastName, ...userDto } = createAdminDto;
      // if ('password' in userDto){
      //   userDto.password = userDto.password
      // }
      console.log(`user: ${JSON.stringify(userDto['password'])}`);

      // Generate Admin ID
      const generateNumber = () => Math.round(Math.random() * 10);
      let number = generateNumber();
      let generateAdminId = `Ad13${number >= 10 ? `0${number}` : `00${number}`}`;

      // check if id is already used
      const admins = await this.adminRepository.find({});
      const IDs = admins.map((admin) => admin.userId);

      while (IDs.includes(generateAdminId)) {
        console.log('generatedId:', generateAdminId);
        number = generateNumber();
        generateAdminId = `Ad13${number >= 10 ? `0${number}` : `00${number}`}`;
      }

      // Hash Password
      const passwordHash = await this.passwordService.hashPassword(
        userDto['password'],
      );

      // Create user in the user's table
      const newUserObject = {
        userId: generateAdminId,
        password: passwordHash,
      };

      const savedUser = await this.userService.createUser(newUserObject);

      const adminUser = await this.adminRepository.create({
        userId: generateAdminId,
        firstName: firstName,
        lastName: lastName,
        user: savedUser,
      });

      const savedAdminUser = await this.adminRepository.save(adminUser);

      const { ...adminData } = savedAdminUser;
      // const {password, ...restData} = user

      return {
        ...adminData,
        // ...restData
      };
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('ISE$Ad1: Internal Server Error');
    }
  }

  async getAdminById(adminId: string): Promise<IAdmin> {
    try {
      const adminUser = this.adminRepository.findOne({
        where: { userId: adminId },
        relations: ['user'],
      });

      if (!adminUser) {
        throw new NotFoundException('Invalid Credentials');
      }

      return adminUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      if (error instanceof BadRequestException) {
        throw new BadRequestException(error);
      }

      throw new InternalServerErrorException('ISE$Ad2: Internal Server Error');
    }
  }

  async getAllAdmins(): Promise<any> {
    try {
      const admins = await this.adminRepository.find({ relations: ['user'] });

      if (admins.length === 0) {
        throw new NotFoundException('No Admins found');
      }

      return instanceToPlain(admins);
    } catch (error) {
      console.log(error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException('ISE$Ad3: Internal Server Error');
    }
  }

  // async updateAdmin(id: string, file?: Express.Multer.File, adminProfileDto: AdminProfileDto): Promise<IAdmin>{
  //   try {
  //     if (adminProfileDto['changePassword']){
  //       // Hash the new password
  //       console.log(`Change password: ${adminProfileDto['changePassword']}`);
  //       adminProfileDto['password'] = await this.passwordService.hashPassword(adminProfileDto['changePassword'])
  //     }

  //     return
  //   } catch (error) {
  //     throw new InternalServerErrorException(error)
  //   }
  // }
}
