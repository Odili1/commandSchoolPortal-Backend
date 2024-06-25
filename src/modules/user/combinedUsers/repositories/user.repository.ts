import dataSource from 'src/database/data-source';
import { User } from '../entities/user.entity';

export const adminRepository = dataSource.getRepository(User);