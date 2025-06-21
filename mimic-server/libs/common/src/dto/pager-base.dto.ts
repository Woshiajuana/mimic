import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { TransformNumber } from '../decorators';

export class PagerBaseDto {
  /**
   * 页码
   */
  @ApiProperty({ default: 1 })
  @TransformNumber()
  @IsNotEmpty()
  pageIndex: number;

  /**
   * 数据量
   */
  @ApiProperty({ default: 10 })
  @TransformNumber()
  @IsNotEmpty()
  pageSize: number;
}
