import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../entities/admin.entity';
import { Repository } from 'typeorm';
import { CreateAdminDto } from '../../dtos/admin.dto';
import { PasswordService } from '../../auth/password.service';
import { IAdmin } from '../../interfaces/admin.interface';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private passwordService: PasswordService,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto): Promise<IAdmin> {
    try {
      console.log(`Admin Service`);

      const generateNumber = () => Math.round(Math.random() * 10);
      let number = generateNumber();
      let generateAdminId = `Ad13${number >= 10 ? `0${number}` : `00${number}`}`;

      // check if id is already used
      const admins = await this.adminRepository.find({});
      const IDs = admins.map((admin) => admin.adminId);

      while (IDs.includes(generateAdminId)) {
        console.log('generatedId:', generateAdminId);
        number = generateNumber();
        generateAdminId = `Ad13${number >= 10 ? `0${number}` : `00${number}`}`;
      }

      const passwordHash = await this.passwordService.hashPassword(
        createAdminDto.password,
      );

      const adminUser = await this.adminRepository.create({
        adminId: generateAdminId,
        username: createAdminDto.username,
        password: passwordHash,
      });

      await this.adminRepository.save(adminUser);

      const { password, ...adminData } = adminUser;

      return adminData;
    } catch (error) {
      throw new InternalServerErrorException('ISE$Ad1: Internal Server Error');
    }
  }

  async getAdminByAdminId(adminId: string): Promise<IAdmin> {
    try {
      const adminUser = this.adminRepository.findOne({
        where: { adminId: adminId },
      });

      if (!adminUser) {
        throw new NotFoundException('Invalid Credentials');
      }

      return adminUser;
    } catch (error) {
      throw new InternalServerErrorException('ISE$Ad2: Internal Server Error');
    }
  }
}
