import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserRolesEnum } from '../../common/constants/user-roles.enum';
import { LoginDto } from './dtos/login.dto';
import { AuthJwtService } from '../auth-jwt/auth-jwt.service';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _authJwtService: AuthJwtService,
  ) {}

  async login(data: LoginDto): Promise<{ token: string }> {
    const user = await this._usersService.getByEmail(data.email);
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new NotFoundException('Invalid credentials');
    }
    const token = await this._authJwtService.generateToken(user.id, user.role);
    return { token };
  }

  async register(data: RegisterDto): Promise<{ token: string }> {
    const hashedPassword = await this._hashPassword(data.password);
    const user = await this._usersService.register({
      ...data,
      password: hashedPassword,
    });
    const token = await this._authJwtService.generateToken(user.id, user.role);
    return { token };
  }

  async validateUser(id: number, role: UserRolesEnum): Promise<any> {
    const user = await this._usersService.getByIdAndRole(id, role);
    if (user) {
      return user;
    }
    return null;
  }

  private async _hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }
}
