import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRolesEnum } from '../../common/constants/user-roles.enum';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  async validate({ id, role }): Promise<any> {
    const user = await this._authService.validateUser(id, role);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
