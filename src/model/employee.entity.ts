// Employees.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'employees' })
export class Employees extends BaseEntity {

  @Column({ type: 'varchar', length: 300, name:'firstname' })
  firstName: string;

  @Column({ type: 'varchar', length: 300, name:'lastname' })
  lastName: string;

  @Column({ type: 'varchar', length: 300, unique: true })
  email: string;
}