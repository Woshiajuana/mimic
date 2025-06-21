import { PagerCommonDto } from '@app/common';
import { IsOptional, IsString } from 'class-validator';

export class PagerIntentionDto extends PagerCommonDto {
  /**
   * userId
   */
  @IsOptional()
  @IsString()
  userId?: string;

  /**
   * 估值id
   */
  @IsOptional()
  @IsString()
  valuationId?: string;
}
