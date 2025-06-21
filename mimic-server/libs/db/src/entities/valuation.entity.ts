import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { IntentionType, ValuationType } from '../enums';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity({
  name: 'valuation',
})
export class Valuation extends BaseEntity {
  @Column({
    comment: '类型',
    type: 'enum',
    enum: ValuationType,
  })
  type: ValuationType;

  @Column({
    name: 'intention_type',
    comment: '意向类型',
    type: 'enum',
    enum: IntentionType,
  })
  intentionType: IntentionType;

  @Column({ name: 'level_id', comment: 'levelId' })
  levelId: string;

  @Column({
    name: 'vehicle_name',
    comment: '车辆名称',
    default: '',
  })
  vehicleName: string;

  @Column({
    name: 'brand_name',
    comment: '品牌名称',
    default: '',
  })
  brandName: string;

  @Column({
    name: 'series_name',
    comment: '车系名称',
    default: '',
  })
  seriesName: string;

  @Column({
    comment: '制造方',
    default: '',
  })
  manufacturer: string;

  @Column({
    name: 'model_name',
    comment: '车型名称',
    default: '',
  })
  modelName: string;

  @Column({
    name: 'model_year',
    comment: '年款',
    default: '',
  })
  modelYear: string;

  @Column({
    name: 'salled_name',
    comment: '销售名称',
    default: '',
  })
  selledName: string;

  @Column({
    name: 'first_registration_date',
    comment: '首次上牌',
    default: '',
  })
  firstRegistrationDate: string;

  @Column({
    comment: '行驶里程‌',
    default: '',
  })
  mileage: string;

  @Column({
    comment: '所在省份',
    default: '',
  })
  province: string;

  @Column({
    comment: '所在城市',
    default: '',
  })
  city: string;

  @Column({
    name: 'body_color',
    comment: '车身颜色',
    default: '',
  })
  bodyColor: string;

  @Column({
    name: 'transfer_count',
    comment: '过户次数',
    default: '',
  })
  transferCount: string;

  @Column({
    name: 'operating_nature',
    comment: '营运性质',
    default: '',
  })
  operatingNature: string;

  @Column({
    comment: '骨架外观',
    default: '',
  })
  facade: string;

  @Column({
    comment: '车辆内饰',
    default: '',
  })
  interior: string;

  @Column({
    name: 'cond_elect',
    comment: '工况电器',
    default: '',
  })
  condElect: string;

  @Column({
    name: 'add_amount',
    comment: '原厂加装配置总金额',
    default: '',
  })
  addAmount: string;

  @Column('simple-json')
  result: Record<string, any>;

  @Column({ name: 'user_id' })
  userId: string;
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
