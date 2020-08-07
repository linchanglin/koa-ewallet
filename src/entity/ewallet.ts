// src/entity/user.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ewallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("decimal", { precision: 12, scale: 2 })
  balance: number;

  @Column()
  user_id: number;
}
