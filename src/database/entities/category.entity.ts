import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { List } from './list.entity';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar' })
  public name: string;

  @Column({ type: 'varchar', nullable: true })
  public description: string;

  @Column({ type: 'boolean', default: true })
  public isActive: boolean;

  @ManyToOne(() => List, (list) => list.category, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn()
  public list: List[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
