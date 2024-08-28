import { Column, Entity, ManyToOne } from 'typeorm';
import { BasicEntity } from './basic.entity';
import { User } from './user.entity';
import { type User as UserType } from './user.entity';

@Entity()
export class Movie extends BasicEntity {
  @Column()
  posterUrl: string;

  @Column()
  title: string;

  @Column()
  publishingYear: number;

  @ManyToOne(() => User, (user) => user.movies, {
    lazy: true,
    nullable: false,
  })
  createdBy: Promise<UserType> | UserType;
}
