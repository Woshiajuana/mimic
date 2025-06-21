import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { IntentionType } from '../enums';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Valuation } from './valuation.entity';

@Entity({
  name: 'intention',
})
export class Intention extends BaseEntity {
  @Column({
    comment: '类型',
    type: 'enum',
    enum: IntentionType,
  })
  type: IntentionType;

  @Column({ name: 'brand_name', comment: '品牌名称' })
  brandName: string;

  @Column({ name: 'series_name', comment: '车系名称' })
  seriesName: string;

  @Column({ comment: '制造方' })
  manufacturer: string;

  @Column({
    name: 'first_registration_date',
    comment: '首次上牌',
    default: '',
  })
  firstRegistrationDate: string;

  @Column({ comment: '所在省份' })
  province: string;

  @Column({ comment: '所在城市' })
  city: string;

  @Column({ comment: '手机号码' })
  mobile: string;

  @Column({ name: 'valuation_id', nullable: true })
  valuationId: string;
  @ManyToOne(() => Valuation)
  valuation: Valuation;

  @Column({ name: 'user_id' })
  userId: string;
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
