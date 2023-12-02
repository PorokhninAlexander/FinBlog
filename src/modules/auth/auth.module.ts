import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthJwtModule } from '../auth-jwt/auth-jwt.module';
import { AuthJwtStrategy } from './auth-jwt.strategy';

@Module({
  imports: [UsersModule, AuthJwtModule],
  providers: [AuthService, AuthJwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
