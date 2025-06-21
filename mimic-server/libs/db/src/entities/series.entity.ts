import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'brand_series',
})
export class Series {
  @PrimaryGeneratedColumn({
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
}
