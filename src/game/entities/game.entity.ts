import {
  Entity,
  Column,
  Unique,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity()
@Unique(['title'])
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: string;

  @Column()
  title: string;

  @Column({ default: '' })
  slug: string;

  @Column()
  category: string;

  @Column({ nullable: true, default: true })
  is_active: boolean;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ default: 0 })
  votes: number;

  @Column()
  provider: string;

  @Column()
  images: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
