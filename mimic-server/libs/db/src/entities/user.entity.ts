import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({
  name: 'user',
})
export class User extends BaseEntity {
  @Column({
    name: 'openid',
    comment: 'openid',
    unique: true,
    nullable: true,
  })
  openid: string;
}
