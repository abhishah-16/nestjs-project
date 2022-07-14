import { Exclude } from 'class-transformer';
import { Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', unique: true })
  public email: string;

  @Column({ type: 'varchar', nullable: true })
  @Exclude({ toPlainOnly: true })
  public password: string;

  @Column({ type: 'varchar', nullable: true })
  public firstName: string;

  @Column({ type: 'varchar', nullable: true })
  public lastName: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  public isVerified: boolean;

  @Column({ type: 'varchar', nullable: true })
  public address1: string;

  @Column({ type: 'varchar', nullable: true })
  public address2: string;

  @Column({ type: 'varchar', nullable: true })
  public city: string;

  @Column({ type: 'varchar', nullable: true })
  public state: string;

  @Column({ type: 'varchar', nullable: true })
  public country: string;

  @Column({ type: 'varchar', nullable: true, unique: true })
  public phone: string;

  @Column({ type: 'varchar', nullable: true })
  public postalCode: string;

  @Column({ type: 'boolean', nullable: true })
  public isActive: boolean;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  public role: Role;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
