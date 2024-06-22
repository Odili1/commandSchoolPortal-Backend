import dataSource from 'src/database/data-source';
import { Admin } from '../entities/admin.entity';

export const adminRepository = dataSource.getRepository(Admin);
