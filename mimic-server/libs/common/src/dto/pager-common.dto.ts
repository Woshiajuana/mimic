import { IsOptional } from 'class-validator';

import { PagerBaseDto } from './pager-base.dto';

export class PagerCommonDto extends PagerBaseDto {
  /**
   * 搜索关键字
   */
  @IsOptional()
  keyword?: string;
}
