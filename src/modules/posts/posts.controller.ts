import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { AuthGuardJwt } from '../../common/guards/auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { UserEntity } from '../users/entities/user.entity';

@Controller('post')
@UseGuards(AuthGuardJwt)
export class PostsController {
  constructor(private readonly _postsService: PostsService) {}

  @Get()
  async getAll() {
    return await this._postsService.getAll();
  }

  @Post('create')
  async create(@Body() data: CreatePostDto, @User() user: UserEntity) {
    return await this._postsService.create(data, user);
  }
}
