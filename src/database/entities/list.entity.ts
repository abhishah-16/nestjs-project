import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from './category.entity';
import { Project } from './project.entity';

@Entity('list')
export class List {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar' })
  public name: string;

  @Column({ type: 'varchar', nullable: true })
  public description: string;

  @Column({ type: 'varchar', enum: ['Low', 'Medium', 'High'], nullable: true })
  public priority: string;

  @Column({ type: 'varchar', nullable: true })
  public status: string;

  @Column({ type: 'varchar', nullable: true })
  public adminComment: string;

  @Column({ type: 'varchar', nullable: true })
  public clientComment: string;

  @Column({ type: 'varchar', nullable: true })
  public fileAttachments: string;

  @Column({ type: 'boolean', default: true })
  public isActive: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => Project, (project) => project.list, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  public project: Project;

  @OneToMany(() => Category, (category) => category)
  public category: Category;
}
