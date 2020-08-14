// src/entity/user.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eps_account: string;

  @Column()
  nickname: string;

  @Column()
  phone: string;

  @Column()
  emergency_phone: string;

  @Column()
  binding_user_id: number;

  @Column()
  binding_title: string;
  
  @Column()
  bank_account_number: string;

  @Column("decimal", { precision: 12, scale: 2 })
  pay_amount_limit: number;

  @Column()
  pay_amount_limit_timespan: number;

  @Column("decimal", { precision: 12, scale: 2 })
  pay_count_limit: number;

  @Column()
  pay_count_limit_timespan: number;

  @Column("decimal", { precision: 12, scale: 2 })
  no_check_amount: number;
}
