import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import * as path from 'path';
import { SnakeNamingStrategy } from './common/typeorm-utils/snake-naming-strategy.class';
import { UsersModule } from './modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthJwtModule } from './modules/auth-jwt/auth-jwt.module';
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-2165c82e-baron6543-2443.a.aivencloud.com',
      port: 28633,
      username: 'avnadmin',
      database: 'defaultdb',
      password: 'AVNS_WNCQVQKG_wqISLdCnQb',
      entities: [
        path.resolve(__dirname, './modules/**/entities/*.entity{.ts,.js}'),
      ],
      namingStrategy: new SnakeNamingStrategy(),
    }),
    JwtModule.register({
      secret: 'aaaa',
      signOptions: {
        expiresIn: '1d',
      },
    }),
    AuthJwtModule,
    AuthModule,
    PostsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
