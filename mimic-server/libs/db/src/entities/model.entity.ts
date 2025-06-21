import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'vehicle_model',
})
export class Model {
  @PrimaryGeneratedColumn({
    name: 'vehicle_model_id',
    comment: '车型id',
  })
  modelId: number;

  @Column({
    name: 'vehicle_model',
    comment: '车型名称',
  })
  modelName: string;

  @Column({
    name: 'level_id',
  })
  levelId: string;

  @Column({
    name: 'brand_series_id',
    comment: '车系id',
  })
  seriesId: number;

  @Column({
    name: 'brand_series',
    comment: '车系名称',
  })
  seriesName: string;

  @Column({
    name: 'brand_id',
    comment: '品牌id',
  })
  brandId: number;

  @Column({
    name: 'brand',
    comment: '品牌名称',
  })
  brandName: string;

  @Column({
    name: 'manufacturer',
    comment: '制造方',
  })
  manufacturer: string;

  @Column({
    name: 'selled_name',
    comment: '销售名称',
  })
  selledName: string;

  @Column({
    name: 'model_year',
    comment: '年款',
  })
  modelYear: string;

  @Column({
    name: 'swept_volume',
    comment: '排量',
  })
  sweptVolume: string;

  @Column({
    name: 'suggestion_price',
    comment: '新车指导价',
  })
  suggestionPrice: string;

  @Column({
    name: 'market_year',
    comment: '上市年份',
  })
  marketYear: string;

  @Column({
    name: 'sale_status',
    comment: '销售状态',
  })
  saleStatus: string;

  @Column({
    name: 'oil_type',
    comment: '燃油类型',
  })
  oilType: string;

  @Column({
    name: 'transmission_type',
    comment: '变速器类型',
  })
  transmissionType: string;
}
