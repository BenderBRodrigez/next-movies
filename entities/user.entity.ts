import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BasicEntity } from './basic.entity';
import { Movie } from './movie.entity';
import { type Movie as MovieType } from './movie.entity';

@Entity()
export class User extends BasicEntity {
  @Column()
  @Index({unique: true})
  email: string;

  @Column()
  password: string;

  @Column()
  token: string;

  @OneToMany(() => Movie, (movie) => movie.createdBy, {
    nullable: true,
    lazy: true,
  })
  movies: Promise<MovieType[]> | MovieType[];
}
