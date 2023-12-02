import { AuthGuard } from '@nestjs/passport';

export const AuthGuardJwt = AuthGuard('jwt');
