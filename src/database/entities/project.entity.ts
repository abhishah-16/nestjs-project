import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { List } from './list.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar' })
  public name: string;

  @Column({ type: 'varchar', nullable: true })
  public description: string;

  @Column({ type: 'boolean', default: true })
  public isActive: boolean;

  @OneToMany(() => List, (list) => list.project, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn()
  public list: List[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
