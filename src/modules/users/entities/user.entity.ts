import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEntity } from '../../../common/constants/abstract.entity';
import { UserRolesEnum } from '../../../common/constants/user-roles.enum';
import { PostEntity } from '../../posts/entities/post.entity';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  photoUrl: string | null;

  @Column({ type: 'enum', enum: UserRolesEnum, nullable: false })
  role: UserRolesEnum;

  @Column('int', { nullable: false })
  level: number;

  @Column('timestamp', { nullable: true })
  emailConfirmedAt: Date | null;

  @Column('timestamp', { nullable: true })
  termsAcceptedAt: Date | null;

  @Column('timestamp', { nullable: true })
  blockedAt: Date | null;

  @Column('timestamp', { nullable: true })
  verifiedAt: Date | null;

  @Column('timestamp', { nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];
}
