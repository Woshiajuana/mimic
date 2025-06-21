import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'brand',
})
export class Brand {
  @PrimaryGeneratedColumn({
    name: 'brand_id',
    comment: '品牌id',
  })
  brandId: number;

  @Column({
    name: 'brand',
    comment: '品牌名称',
  })
  brandName: string;
}
