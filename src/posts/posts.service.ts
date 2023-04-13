import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return await this.postsRepository.find();
  }

  async findProductById(id: number): Promise<Post> {
    return this.postsRepository.findOne({
      where: {
        id,
      },
    });
  }

  createPost(post: CreatePostInput): Promise<Post> {
    const newPost = this.postsRepository.create(post);
    return this.postsRepository.save(newPost);
  }
}
