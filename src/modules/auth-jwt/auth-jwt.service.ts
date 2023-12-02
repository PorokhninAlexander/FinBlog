import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UserRolesEnum } from '../../common/constants/user-roles.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthJwtService {
  private readonly _logger = new Logger(AuthJwtService.name);
  constructor(private readonly _jwtService: JwtService) {}

  async generateToken(id: number, role: UserRolesEnum): Promise<string> {
    try {
      return await this._jwtService.signAsync({ id, role });
    } catch (err) {
      this._logger.error(err, this.generateToken.name);
      throw new InternalServerErrorException('Error generating token');
    }
  }
}
