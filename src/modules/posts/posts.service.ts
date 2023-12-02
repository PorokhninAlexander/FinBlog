import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly _postRepository: Repository<PostEntity>,
  ) {}

  async getAll() {
    return await this._postRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async create(data: CreatePostDto, user: UserEntity) {
    const post = this._postRepository.create({ ...data, userId: user.id });
    await this._postRepository.save(post);
  }
}
