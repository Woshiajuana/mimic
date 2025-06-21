import { PagerCommonDto } from '@app/common';
import { IsOptional, IsString } from 'class-validator';

export class PagerValuationDto extends PagerCommonDto {
  /**
   * userId
   */
  @IsOptional()
  @IsString()
  userId?: string;
}
