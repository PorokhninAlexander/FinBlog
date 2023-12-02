import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuardJwt } from '../../common/guards/auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { UserEntity } from './entities/user.entity';

@Controller('user')
@UseGuards(AuthGuardJwt)
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Get()
  getAll() {
    return this._usersService.getAll();
  }

  @Get('me')
  getMe(@User() user: UserEntity) {
    return user;
  }
}
