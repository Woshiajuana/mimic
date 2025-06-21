import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Status } from '../enums';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: 'ID',
  })
  id: string;

  @Column({
    comment: '状态: (0: 禁用、1: 正常) 默认: 1',
    type: 'enum',
    enum: Status,
    default: Status.NORMAL,
  })
  status: Status;

  @Column({
    comment: '备注',
    length: 200,
    default: '',
  })
  remark: string;

  @CreateDateColumn({
    name: 'created_at',
    comment: '创建时间',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    comment: '更新时间',
  })
  updatedAt: Date;
}
