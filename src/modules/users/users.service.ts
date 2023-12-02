import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserRolesEnum } from '../../common/constants/user-roles.enum';
import { RegisterDto } from '../auth/dtos/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
  ) {}

  async getByIdAndRole(
    id: number,
    role: UserRolesEnum,
  ): Promise<UserEntity | undefined> {
    return this._userRepository.findOne({ where: { id, role } });
  }

  async getByEmail(email: string): Promise<UserEntity | undefined> {
    return this._userRepository.findOne({ where: { email } });
  }

  async register(data: RegisterDto): Promise<UserEntity> {
    const user = this._userRepository.create({
      ...data,
      role: UserRolesEnum.READER,
    });
    return this._userRepository.save(user);
  }

  getAll(): Promise<UserEntity[]> {
    return this._userRepository.find();
  }
}
